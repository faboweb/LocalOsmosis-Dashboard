import { createProtobufRpcClient, QueryClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

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
	const tmClient = await Tendermint34Client.connect(process.env.RPC_ENDPOINT);
	const { QueryClientImpl } = osmosis.gamm.v1beta1;
	const basicClient = new QueryClient(tmClient);
	const rpc = createProtobufRpcClient(basicClient);
	const osmoClient = new QueryClientImpl(rpc);

	// const { nodeInfo, sync_info } = (await tmClient.status())

	const subscribeToBlocks = async callback => {
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
	});
});

export default connectors;
