// stuff to fetch server-side
import axios from 'axios';

import { ChainStatus } from '@/utils/server/types';

interface ChainNodeProvider {
	address: string;
	provider?: string;
}

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
		const res = await axios.get('https://status.cosmos.directory/');
		const data: AllChainStatusResponse = res?.data;
		const ret: ChainStatus[] = [];
		data.chains.forEach(chainData => {
			// only use cosmos and osmosis for development
			if (
				process.env.NODE_ENV === 'development' &&
				chainData.name !== 'cosmoshub' &&
				chainData.name !== 'osmosis' &&
				chainData.name !== 'juno' &&
				chainData.name !== 'crescent'
			)
				return;

			// ignore chains with no height(probably halted), only available if both rpc & rest are available
			const chainStatus: ChainStatus = { name: chainData.name, available: false };
			if (chainData.height) chainStatus.available = chainData.rpc.available && chainData.rest.available;
			ret.push(chainStatus);
		});
		return ret;
	} catch (ex) {
		console.warn(ex);
		return [];
	}
};
