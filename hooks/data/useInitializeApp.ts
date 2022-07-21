import { useEffect } from 'react';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

import { useAppDispatch } from '@/hooks/store';
import { setBulkChainAssets, setBulkChainData, setChainStatus } from '@/store/features/chain/chainDataSlice';
import { initAddressTxs } from '@/store/features/chain/validatorDataSlice';
import { AppDispatch } from '@/store/store';
import { ChainAssets, ChainData, ChainStatus, getChainAssets, getChainStatuses } from '@/utils/data/client/general';
import { getChainData } from '@/utils/data/client/general/chain-data';

dayjs.extend(relativeTime);
dayjs.extend(duration);

async function populateChainAssets(chainStatuses: ChainStatus[], dispatch: AppDispatch) {
	const promises: Promise<ChainAssets>[] = [];
	chainStatuses.forEach(chainStatus => {
		//	general assets for unvailable chains are also queriable
		promises.push(getChainAssets(chainStatus.name));
	});
	const res = await Promise.all(promises);
	await dispatch(setBulkChainAssets(res));
}

async function populateChainData(chainStatuses: ChainStatus[], dispatch: AppDispatch) {
	const promises: Promise<ChainData>[] = [];
	chainStatuses.forEach(chainStatus => {
		promises.push(getChainData(chainStatus.name));
	});
	const res = await Promise.all(promises);
	await dispatch(setBulkChainData(res));
}

async function initializeApp(dispatch: AppDispatch) {
	const chainStatuses = await getChainStatuses();
	const promises: Promise<void>[] = [];
	promises.push(populateChainAssets(chainStatuses, dispatch));
	promises.push(populateChainData(chainStatuses, dispatch));
	await Promise.all(promises);
	dispatch(setChainStatus(chainStatuses));
	dispatch(initAddressTxs(chainStatuses));
}

//  initialize app will be called twice in development due to react strict mode
export function useInitializeApp() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		initializeApp(dispatch);
	}, []);
}
