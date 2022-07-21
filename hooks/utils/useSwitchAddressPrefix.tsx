import { useEffect, useState } from 'react';

import { useAppSelector } from '@/hooks/store';
import { switchAddressPrefix } from '@/utils/blockchain';

export const useSwitchAddressPrefix = (address: string, chain: string): string | undefined => {
	const [retAddress, setRetAddress] = useState<string>();
	const prefix = useAppSelector(state => state.chainData.data[chain]?.bech32Prefix);
	useEffect(() => {
		if (!prefix) return;
		setRetAddress(switchAddressPrefix(address, prefix));
	}, [prefix]);

	return retAddress;
};
