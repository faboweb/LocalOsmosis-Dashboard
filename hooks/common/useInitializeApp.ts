import { useRunOnHydrate } from '@/hooks/common/useRunOnHydrate';
import { useAppDispatch } from '@/hooks/store';
import { setBulkChainData, setChainStatus } from '@/store/features/chain/chainDataSlice';
import { AppDispatch } from '@/store/store';
import { ChainAssets, getChainAssets } from '@/utils/data/client';
import { ChainStatus, ServerSideProps } from '@/utils/data/server';

async function initializeApp(chainStatuses: ChainStatus[], dispatch: AppDispatch) {
	const promises: Promise<ChainAssets>[] = [];
	chainStatuses.forEach(async chainStatus => {
		//	chain assets for unvailable chains are also queriable
		promises.push(getChainAssets(chainStatus.name));
	});
	const res = await Promise.all(promises);
	await dispatch(setBulkChainData(res));
	dispatch(setChainStatus(chainStatuses));
}

export function useInitializeApp({ chainStatuses }: ServerSideProps) {
	const dispatch = useAppDispatch();
	useRunOnHydrate(() => {
		initializeApp(chainStatuses, dispatch);
	});
}
