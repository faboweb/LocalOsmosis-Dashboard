//	turns out chains.cosmos.directory returns the same data including other required params
import axios from 'axios';

import { cosmosAsset } from '@/constants/defaults';
import { urlBuilder } from '@/utils/chains';
import { ChainAssets, RawChainAsset, refineChainAsset } from '@/utils/data/client/general/types';
import { localStorage } from '@/utils/data/localStorage';

// TODO : auto parse https://github.com/cosmos/chain-registry/blob/master/assetlist.schema.json into a types file?
//  https://chains.cosmos.directory/osmosis/assetlist
interface ChainAssetsResponse {
	$schema: string;
	chain_name: string;
	assets: RawChainAsset[];
}

export async function getChainAssets(chain: string): Promise<ChainAssets> {
	try {
		let assets = localStorage.get(chain, 'chain-assets');
		if (assets) return assets;
		const url = urlBuilder.getChainAssets(chain);
		const res = await axios.get(url);
		const data: ChainAssetsResponse = res?.data;
		assets = data.assets.map((asset: RawChainAsset) => refineChainAsset(asset));
		const ret = {
			chainName: chain,
			assets,
		};
		if (!localStorage.set(chain, ret, 'chain-assets')) console.warn(`failed to set localStorage for chain[${chain}]`);
		return ret;
	} catch (ex) {
		console.warn(ex);
		return {
			chainName: chain,
			assets: [cosmosAsset],
		};
	}
}
