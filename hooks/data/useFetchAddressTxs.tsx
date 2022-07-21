import { useEffect, useRef, useState } from 'react';

import isEmpty from 'lodash/isEmpty';

import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { selectAvailableChains } from '@/store/features/chain/chainDataSlice';
import { selectAddressTxs, setValidatorTxs } from '@/store/features/chain/validatorDataSlice';
import { getAddressTxs } from '@/utils/data/client/chain/AddressTxs';

export const useFetchAddressTxs = (address: string, chain: string) => {
	const dispatch = useAppDispatch();
	const fetched = useRef<boolean>(false);
	const [fetching, setFetching] = useState(false);
	const { chains, addressTxs } = useAppSelector(state => ({
		chains: selectAvailableChains(state),
		addressTxs: selectAddressTxs(state, chain, address),
	}));

	useEffect(() => {
		if (isEmpty(chains) || fetched.current) return;
		if (!chains.map(chainStatus => chainStatus.name).includes(chain))
			throw new Error(`Chain ${chain} is not available`);
		if (isEmpty(addressTxs)) {
			//  fetch txs
			if (fetching) return;
			setFetching(true);
			getAddressTxs(chain, address)
				.then(async txs => {
					fetched.current = true;
					await dispatch(setValidatorTxs({ address, chain, txs }));
				})
				.finally(() => {
					setFetching(false);
				});
		}
	}, [chains, chain, address, fetching]);
	return { addressTxs: addressTxs ?? [], fetching };
};
