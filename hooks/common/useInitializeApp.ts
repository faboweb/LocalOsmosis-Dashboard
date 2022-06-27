import { setChainStatus } from '@/store/features/chain/chainDataSlice';
import { AppDispatch } from '@/store/store';

import { useRunOnHydrate } from '@/hooks/common/useRunOnHydrate';
import { useAppDispatch } from '@/hooks/store';

import { ChainStatus, ServerSideProps } from '@/utils/data/server';

function initializeApp(chainStatuses: ChainStatus[], dispatch: AppDispatch) {
	dispatch(setChainStatus(chainStatuses));
}

export function useInitializeApp({ chainStatuses }: ServerSideProps) {
	const dispatch = useAppDispatch();
	useRunOnHydrate(() => {
		initializeApp(chainStatuses, dispatch);
	});
}
