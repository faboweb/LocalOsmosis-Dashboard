import { useEffect } from 'react';

import { useAppDispatch } from '@/hooks/store';
import { setBulkChainAssets, setBulkChainData, setChainStatus } from '@/store/features/chain/chainDataSlice';
import { AppDispatch } from '@/store/store';
import { ChainAssets, ChainData, ChainStatus, getChainAssets, getChainStatuses } from '@/utils/data/client';
import { getChainData } from '@/utils/data/client/chain-data';

async function populateChainAssets(chainStatuses: ChainStatus[], dispatch: AppDispatch) {
	const promises: Promise<ChainAssets>[] = [];
	chainStatuses.forEach(chainStatus => {
		//	chain assets for unvailable chains are also queriable
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
}

export function useInitializeApp() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		initializeApp(dispatch);
	}, []);
}
