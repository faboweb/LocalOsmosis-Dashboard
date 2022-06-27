import axios from 'axios';

import { urlBuilder } from '@/utils/chains';
import { ChainAsset, ChainAssets, refineChainAsset } from '@/utils/data/client/types';

import { cosmosAsset } from '@/constants/defaults';

// TODO : auto parse https://github.com/cosmos/chain-registry/blob/master/assetlist.schema.json into a types file?
//  https://chains.cosmos.directory/osmosis/assetlist
interface ChainAssetsResponse {
	$schema: string;
	chain_name: string;
	assets: ChainAsset[];
}

export async function getChainAssets(chain: string): Promise<ChainAssets> {
	try {
		const url = urlBuilder.getChainData('assets', chain);
		const res = await axios.get(url);
		const data: ChainAssetsResponse = res?.data;
		const assets = data.assets.map((asset: ChainAsset) => refineChainAsset(asset));
		return {
			chainName: chain,
			assets,
		};
	} catch (ex) {
		console.warn(ex);
		return {
			chainName: chain,
			assets: [cosmosAsset],
		};
	}
}
