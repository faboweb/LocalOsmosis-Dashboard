import { fromBech32, toBech32 } from '@cosmjs/encoding';

export const switchAddressPrefix = (address: string, prefix: string) => {
	return toBech32(prefix, fromBech32(address).data);
};
