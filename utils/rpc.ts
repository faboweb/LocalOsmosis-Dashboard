import { osmosis } from 'osmojs';
import { CosmWasmClient } from "cosmwasm";
import { createProtobufRpcClient, QueryClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';
import { setupGovExtension } from '@cosmjs/launchpad';

// node config
// last block timestamp
// events
// proposals
// contracts
// blocks + stream
// consensus state
// mempool txs

const unconfirmedTxs = async () => {
	const res = await fetch(`${process.env.RPC_ENDPOINT}/unconfirmed_txs`).then(res => res.json());
	return res.result.txs;
};

const subscribeToConsensusState = async () => {
	const res = await fetch(`${process.env.RPC_ENDPOINT}/unconfirmed_txs`).then(res => res.json());
	return res.result.txs;
};

const connectors = new Promise(async resolve => {
    const rpcEndpoint = process.env.RPC_ENDPOINT;
    const tmClient = await Tendermint34Client.connect(rpcEndpoint);
    const { QueryClientImpl } = osmosis.gamm.v1beta1;
    const basicClient = QueryClient.withExtensions(tmClient, setupGovExtension);
    const rpc = createProtobufRpcClient(basicClient);
    const osmoClient = new QueryClientImpl(rpc);
    const cosmwasmClient = await CosmWasmClient.connect(rpcEndpoint);

    const proposals = async () => {
        return basicClient.gov.proposals()
    }

    const uploadedContracts = async () => {
        const codes = await cosmwasmClient.getCodes()
        return codes
    }

    const runningContracts = async () => {
        const codes = await cosmwasmClient.getCodes()
        const contractAddresses = [].concat(await Promise.all(codes.map(async code => cosmwasmClient.getContracts(code))))
        return await Promise.all(contractAddresses.map(async addr => cosmwasmClient.getContract(addr)))
    }

    const nodeInfo = async () => {
        const { nodeInfo, sync_info } = (await tmClient.status())
        return nodeInfo
    }

    const subscribeToBlocks = async (callback) => {
        tmClient.subscribeNewBlock().addListener({
            next: i => callback,
            error: err => console.error(err),
            complete: () => console.log('completed'),
        });
    };

    const blocks = async () => {
        const { latestBlockHeight } = (await tmClient.status()).syncInfo;
        return tmClient.blockSearch({
            query: `block.height > ${latestBlockHeight - 100}`,
        });
    };

    resolve({
        tmClient,
        osmoClient,
        subscribeToBlocks,
        blocks,
        unconfirmedTxs,
        subscribeToConsensusState,
        nodeInfo,
        proposals,
        uploadedContracts,
        runningContracts
    });
});

export default connectors;
