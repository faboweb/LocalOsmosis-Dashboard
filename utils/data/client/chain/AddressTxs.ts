import axios from 'axios';
import { TxResponse } from 'cosmjs-types/cosmos/base/abci/v1beta1/abci';
import { Tx as RawTx } from 'cosmjs-types/cosmos/tx/v1beta1/tx';

import { urlBuilder } from '@/utils/chains';
import { refineTx, Tx } from '@/utils/data/client/chain/types';
import { localStorage } from '@/utils/data/localStorage';

interface AddressTxsResponse {
	txs: RawTx[];
	tx_responses: TxResponse[];
	pagination: {
		next_key: string | null; // Always null for some reason
		total: string;
	};
}

// Won't usually cache this kind of request, but I don't want the public api to blacklist me + it's really slow
export async function getAddressTxs(chain: string, address: string): Promise<Tx[]> {
	try {
		const data = localStorage.get(address, 'account-txs');
		if (data) return data;
		const url = urlBuilder.getAddressTxs(chain, address);
		const res = await axios.get(url);
		const respData: AddressTxsResponse = res?.data;
		const ret = respData.txs.map((rawTx: RawTx, index) => refineTx(rawTx, respData.tx_responses[index]));
		console.log('txs', ret);
		localStorage.set(address, ret, 'account-txs');
		return ret;
	} catch (e) {
		console.warn(e);
		return [];
	}
}
