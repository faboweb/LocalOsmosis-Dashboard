import { useEffect, useRef } from 'react';

import isEmpty from 'lodash/isEmpty';

import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { selectAvailableChains } from '@/store/features/chain/chainDataSlice';
import { selectAddressTxs, setValidatorTxs } from '@/store/features/chain/validatorDataSlice';
import { getAddressTxs } from '@/utils/data/client/chain/AddressTxs';

export const useFetchAddressTxs = (address: string, chain: string) => {
	const dispatch = useAppDispatch();
	const fetching = useRef<boolean>(false);
	const { chains, addressTxs } = useAppSelector(state => ({
		chains: selectAvailableChains(state),
		addressTxs: selectAddressTxs(state, chain, address),
	}));

	useEffect(() => {
		if (isEmpty(chains)) return;
		if (!chains.map(chainStatus => chainStatus.name).includes(chain))
			throw new Error(`Chain ${chain} is not available`);
		if (isEmpty(addressTxs)) {
			//  fetch txs
			if (fetching.current) return;
			fetching.current = true;
			getAddressTxs(chain, address)
				.then(async txs => {
					await dispatch(setValidatorTxs({ address, chain, txs }));
				})
				.finally(() => {
					fetching.current = false;
				});
		}
	}, [chains, chain, address]);
	return addressTxs ?? [];
};
