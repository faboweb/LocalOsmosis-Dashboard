import camelcaseKeys from 'camelcase-keys';
import pick from 'lodash/pick';
import { CamelCasedPropertiesDeep, Except, Merge } from 'type-fest';

export interface DenomUnit {
	denom: string;
	exponent: number;
	aliases?: string[];
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

// replace logo_URIs & base with logo & micro. Camel cased
export type ChainAsset = CamelCasedPropertiesDeep<
	Merge<Except<RawChainAsset, 'logo_URIs' | 'base'>, { logo: string; micro: string; native?: string }>
>;

export interface ChainAssets {
	chainName: string;
	assets: ChainAsset[];
}

export const refineChainAsset = (asset: RawChainAsset): ChainAsset => {
	const camelCased = camelcaseKeys(asset, { deep: true });

	return {
		...pick(camelCased, ['description', 'denomUnits', 'name', 'symbol', 'display', 'coingeckoId']),
		micro: camelCased.base,
		// @ts-ignore - bug with camelcaseKeys
		logo: camelCased.logoUrIs?.svg ?? camelCased.logoUrIs?.png ?? '/icons/generic/missing-token.svg',
	};
};
