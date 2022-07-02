import axios from 'axios';
import { sort } from 'fast-sort';

import { ChainStatus } from '@/utils/data/server/types';
import { urlBuilder } from '@/utils/index';

interface ChainNodeProvider {
	address: string;
	provider?: string;
}

// TODO : auto parse https://github.com/cosmos/chain-registry/blob/master/chain.schema.json into a types file?
// ^ in hindsight, probably running a dedicated data aggregator is more maintainable
//	https://status.cosmos.directory/
interface ChainStatusResponse {
	name: string;
	height: number;
	available: boolean;
	rpc: {
		available: boolean;
		height: number;
		best: ChainNodeProvider[];
	};
	rest: {
		available: boolean;
		height: number;
		best: ChainNodeProvider[];
	};
}
interface AllChainStatusResponse {
	chains: ChainStatusResponse[];
}

// TODO : append whatever is needed to be populated for every page
export const getChainStatuses = async (): Promise<ChainStatus[]> => {
	try {
		const res = await axios.get(urlBuilder.getBase('status'));
		const data: AllChainStatusResponse = res?.data;
		const ret: ChainStatus[] = [];
		data.chains.forEach(chainData => {
			// only use cosmos, osmosis, juno, crescent for development
			// if (
			// 	process.env.NODE_ENV === 'development' &&
			// 	chainData.name !== 'cosmoshub' &&
			// 	chainData.name !== 'osmosis' &&
			// 	chainData.name !== 'juno' &&
			// 	chainData.name !== 'crescent' &&
			// 	chainData.name !== 'chronicnetwork' //	one that api is down
			// )
			// 	return;

			// ignore chains with no height(probably halted), only available if both rpc & rest are available
			const chainStatus: ChainStatus = { name: chainData.name, available: false };
			if (chainData.height) chainStatus.available = chainData.rpc.available && chainData.rest.available;
			ret.push(chainStatus);
		});
		return sort(ret).asc('name');
	} catch (ex) {
		console.warn(ex);
		return [];
	}
};
