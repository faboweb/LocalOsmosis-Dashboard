import { useEffect, useRef } from 'react';

import isEmpty from 'lodash/isEmpty';

import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { selectAvailableChains } from '@/store/features/chain/chainDataSlice';
import { selectValidatorData, setValidatorData } from '@/store/features/chain/validatorDataSlice';
import { getValidatorsData } from '@/utils/data/client/chain';

/**
 * @desc fetches if not fetched yet. Throws error if chain unavailable. Wrap in ErrorBoundary for error handling
 * @TODO just use bloody react query or swr next time what are you trying to prove here 🤦‍
 * @param chain
 */
export const useFetchValidators = (chain: string) => {
	const dispatch = useAppDispatch();
	const fetching = useRef<boolean>(false);
	const { chains, validatorData } = useAppSelector(state => ({
		chains: selectAvailableChains(state),
		validatorData: selectValidatorData(state, chain),
	}));

	useEffect(() => {
		if (isEmpty(chains)) return;
		if (!chains.map(chainStatus => chainStatus.name).includes(chain))
			throw new Error(`Chain ${chain} is not available`);

		if (isEmpty(validatorData)) {
			// fetch validators
			if (fetching.current) return;
			fetching.current = true;
			getValidatorsData(chain)
				.then(async validators => {
					await dispatch(setValidatorData({ chain, validators }));
				})
				.finally(() => {
					fetching.current = false;
				});
		}
	}, [chains, chain]);
	return validatorData ?? [];
};
