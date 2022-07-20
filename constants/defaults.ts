import { ChainAsset, ChainData } from '@/utils/data/client/general/types';

export const cosmosAsset: ChainAsset = {
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
	symbol: '404',
	logo: '/icons/generic/missing-token.svg',
	coingeckoId: 'cosmos',
};

export const cosmosChainData: ChainData = {
	chainName: 'cosmoshub',
	chainId: 'cosmoshub-4',
	prettyName: 'Cosmos Hub',
	symbol: 'ATOM',
	decimals: 6,
	explorers: [
		{
			kind: 'mintscan',
			url: 'https://www.mintscan.io/cosmos',
			// eslint-disable-next-line no-template-curly-in-string
			txPage: 'https://www.mintscan.io/cosmos/txs/${txHash}',
		},
	],
	image: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.svg',
	params: {
		authz: true,
		actualBlockTime: 6.768129999637604,
		actualBlocksPerYear: 4659484.968771076,
		unbondingTime: 1814400,
		maxValidators: 175,
		blocksPerYear: 4360000,
		blockTime: 7.2389724770642205,
		communityTax: 0.02,
		baseInflation: 0.12035982251717305,
		estimatedApr: 0.18992804771556349,
		calculatedApr: 0.20297405584373937,
		bondedRatio: 0.6210384628780007,
		annualProvision: '36152204348754.748477212069012244',
		bondedTokens: '186539906495740',
		totalSupply: '300367718983590',
	},
};
