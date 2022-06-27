import { RefinedChainAsset } from '@/utils/data/client/types';

export const cosmosAsset: RefinedChainAsset = {
	description: 'The native staking and governance token of the Cosmos Hub.',
	denomUnits: [
		{
			denom: 'uatom',
			exponent: 0,
		},
		{
			denom: 'atom',
			exponent: 6,
		},
	],
	micro: 'uatom',
	name: 'Cosmos',
	display: 'atom',
	symbol: 'ATOM',
	logo: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.svg',
	coingeckoId: 'cosmos',
};
