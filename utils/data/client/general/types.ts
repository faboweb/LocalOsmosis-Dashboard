import camelcaseKeys, { CamelCaseKeys } from 'camelcase-keys';
import pick from 'lodash/pick';
import { CamelCasedPropertiesDeep, Except, Merge } from 'type-fest';

export interface ChainStatus {
	name: string;
	height: number;
	available: boolean; //	rpc, rest are both available. TODO : add statuses of both and make UI aware of which is available
}

export interface DenomUnit {
	denom: string;
	exponent: number;
	aliases?: string[];
}

export interface ChainAssets {
	chainName: string;
	assets: ChainAsset[];
}

// the first asset in the list of ChainAssets appears to be the native asset
export interface RawChainAsset {
	description?: string;
	denom_units: DenomUnit[];
	base: string; //		"uatom"
	//	-> micro
	name: string; //		"Cosmos"
	display: string; //	"atom"
	symbol: string; //	"ATOM"
	logo_URIs?: {
		png?: string;
		svg?: string;
	};
	// -> logoURI svg with png as fallback
	coingecko_id: string;
}

interface RawExplorer {
	kind: string;
	url: string;
	tx_page: string;
}

export interface RawChainData {
	$schema: string;
	chain_name: string;
	chain_id: string;
	pretty_name: string;
	status: string;
	network_type: string;
	bech32_prefix: string;
	genesis: {
		genesis_url: string;
	};
	daemon_name: string;
	node_home: string;
	key_algos: string[];
	slip44: number;
	fees: {
		fee_tokens: {
			denom: string;
			fixed_min_gas_price: number;
		}[];
	};
	codebase: any;
	peers: any;
	apis: any;
	explorers: RawExplorer[];
	name: string;
	path: string;
	symbol: string;
	denom: string;
	decimals: number;
	coingecko_id: string;
	image: string;
	height: number;
	best_apis: any;
	params: {
		authz: boolean;
		actual_block_time: number;
		actual_blocks_per_year: number;
		unbonding_time: number;
		max_validators: number;
		blocks_per_year: number;
		block_time: number;
		community_tax: number;
		base_inflation: number;
		estimated_apr: number;
		calculated_apr: number;
		bonded_ratio: number;
		annual_provision: string;
		bonded_tokens: string;
		total_supply: string;
	};
}

// replace logo_URIs & base with logo & micro. Camel cased
export type ChainAsset = CamelCaseKeys<
	Merge<Except<RawChainAsset, 'logo_URIs' | 'base'>, { logo: string; micro: string; native?: string }>,
	true
>;

const pickChainData = [
	'chainName',
	'chainId',
	'prettyName',
	'symbol',
	'explorers',
	'decimals',
	'image',
	'bech32Prefix',
	'params',
] as const;
export type ChainData = Pick<CamelCasedPropertiesDeep<RawChainData>, typeof pickChainData[number]>;

export const refineChainAsset = (asset: RawChainAsset): ChainAsset => {
	const camelCased = camelcaseKeys(asset, { deep: true });

	return {
		...pick(camelCased, ['description', 'denomUnits', 'name', 'symbol', 'display', 'coingeckoId']),
		micro: camelCased.base,
		// @ts-ignore - bug with camelcaseKeys
		logo: camelCased.logoUrIs?.svg ?? camelCased.logoUrIs?.png ?? '/icons/generic/missing-token.svg',
	};
};

export const refineChainData = (data: RawChainData): ChainData => {
	const camelCased = camelcaseKeys(data, { deep: true });
	return {
		...pick(camelCased, pickChainData),
	};
};
