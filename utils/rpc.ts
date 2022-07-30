import { setupGovExtension } from '@cosmjs/launchpad';
import { createProtobufRpcClient, QueryClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';
import { CosmWasmClient } from 'cosmwasm';
import { osmosis } from 'osmojs';

// node config
// last block timestamp
// events
// proposals
// contracts
// blocks + stream
// consensus state
// mempool txs

const unconfirmedTxs = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_RPC_ENDPOINT}/unconfirmed_txs`).then(res => res.json());
	return res.result.txs;
};

const connectors = new Promise(async resolve => {
	const rpcEndpoint = process.env.NEXT_PUBLIC_RPC_ENDPOINT;
	const tmClient = await Tendermint34Client.connect(rpcEndpoint);
	const { QueryClientImpl } = osmosis.gamm.v1beta1;
	const basicClient = QueryClient.withExtensions(tmClient, setupGovExtension);
	const rpc = createProtobufRpcClient(basicClient);
	const osmoClient = new QueryClientImpl(rpc);
	const cosmwasmClient = await CosmWasmClient.connect(rpcEndpoint);

	const proposals = async () => {
		return basicClient.gov.proposals();
	};

	const uploadedContracts = async () => {
		const codes = await cosmwasmClient.getCodes();
		return codes;
	};

	const contractHistory = async (addr) => {
		const history = await cosmwasmClient.getContractCodeHistory(addr);
		return history;
	};

	const contractSiblings = async (codeId) => {
		const contracts = await cosmwasmClient.getContracts(codeId);
		return contracts;
	};

	const runningContracts = async () => {
		const codes = await cosmwasmClient.getCodes();
		const contractAddresses = [].concat(
			...(await Promise.all(codes.map(async code => cosmwasmClient.getContracts(code.id).catch(err => null)))).filter(
				x => !!x
			)
		);

		const contractAddressesDict = {};
		contractAddresses.forEach(addr => (contractAddressesDict[addr] = 1));
		return [].concat(
			...(
				await Promise.all(
					Object.keys(contractAddressesDict) // dedupe
						.slice(0, 50) // Extend , to reduce requests
						.map(async addr => cosmwasmClient.getContract(addr).catch(err => null))
				)
			).filter(x => !!x)
		);
	};

	const nodeInfo = async () => {
		const { nodeInfo, sync_info } = await tmClient.status();
		return nodeInfo;
	};

	const block = async (height) => {
		return (
			await tmClient.block(height)
		).block;
	};

	const blocks = async () => {
		const { latestBlockHeight } = (await tmClient.status()).syncInfo;
		return (
			await tmClient.blockSearch({
				query: `block.height > ${latestBlockHeight - 100}`,
			})
		).blocks;
	};

	const txs = async () => {
		const { latestBlockHeight } = (await tmClient.status()).syncInfo;
		const _txs = await tmClient.txSearchAll({
			query: 'tx.height>' + (latestBlockHeight - 3000),
			per_page: 50,
		});
		return _txs;
	};

	resolve({
		tmClient,
		osmoClient,
		block,
		blocks,
		unconfirmedTxs,
		nodeInfo,
		proposals,
		uploadedContracts,
		runningContracts,
		contractHistory,
		contractSiblings,
		txs,
	});
});

export default connectors;
