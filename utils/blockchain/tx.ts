import dayjs from 'dayjs';

import { ParsedTx } from '@/utils/blockchain/types';
import { Tx } from '@/utils/data/client/chain';

export const parseTx = (tx: Tx): ParsedTx => {
	const type = getTxType(tx);
	// RIP typescript
	return {
		hash: tx.txhash,
		type,
		result: tx.code === 0,
		amount: getTxAmount(tx, type),
		fee: (tx.authInfo as unknown as any).fee.amount[0]?.amount as string,
		height: Number(tx.height),
		timestamp: dayjs(tx.timestamp).unix(),
	};
};

// TODO : currently only guesses tx type from first message. Upgrade s.t. it takes account of all or most
const getTxType = (tx: Tx): string => {
	const type = (tx.body as unknown as any).messages?.[0]?.['@type']; // RIP typescript
	if (!type) return 'Error';

	// TODO : add all the exceptions here

	const split = type.split('.');
	const ret = split[split.length - 1];
	if (ret.startsWith('Msg')) return ret.split('Msg')[1];
	return ret;
};

const getTxAmount = (tx: Tx, type: string): string => {
	if (type === 'Send') {
		return (tx.body as unknown as any).messages[0].amount[0]?.amount;
	}
	return '0';
};
