import { useEffect } from 'react';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

import { useStore } from '@/hooks/common/useStore';
import { AppContext, NodeConfig } from '@/store/store';
import { refineNewBlockData } from '@/utils/data/client/chain/block';
import { refineTxData } from '@/utils/data/client/chain/tx';
import connectors from '@/utils/rpc';
import { subscribeToEvents } from '@/utils/tendermint';

dayjs.extend(relativeTime);
dayjs.extend(duration);

let runOnce = false;
async function initializeApp(store: AppContext) {
	if (runOnce) return;
	runOnce = true;
	const connector = await connectors;
	const {
		tmClient,
		osmoClient,
		unconfirmedTxs,
		nodeInfo,
		proposals,
		uploadedContracts,
		runningContracts,
		txs,
		blocks,
	} = connector;
	// subscribeToBlocks(async event => {
	// 	console.log(event);
	// });
	nodeInfo().then((value: NodeConfig) => {
		console.log('nodeInfo', value);
		store.setNodeConfig(value);
	});
	subscribeToEvents((event: any) => {
		switch (event.type) {
			case 'NewBlock':
				store.pushBlocks(refineNewBlockData(event));
				break;
			case 'Tx':
				store.pushTx(refineTxData(event));
				break;
			case 'NewBlockHeader':
				break;
			default:
				store.pushEvents(event);
		}
	});
	runningContracts().then(value => {
		store.pushContracts(value);
	});
	blocks().then(value => {
		store.setBlocks(value.map(refineNewBlockData));
	});
}

//  initialize app will be called twice in development due to react strict mode
export function useInitializeApp() {
	const store = useStore();
	useEffect(() => {
		initializeApp(store);
	}, []);
}
