import { uuid } from 'uuidv4';

import { TxState, TxType } from '@/utils/wallet/walletTypes';

export class Tx {
	private _tx: TxType;

	constructor(txObj: any) {
		this._tx = {
			id: uuid(),
			chainId: txObj.chainId,
			created: Date.now(),
			content: txObj,
			signedTx: '',
			state: TxState.UNSIGNED,
			timestamp: Date.now(),
		};
	}

	get signedTx() {
		return this._tx.signedTx;
	}

	get id() {
		return this._tx.id;
	}

	get state() {
		return this._tx.state;
	}

	get data() {
		return this._tx.content;
	}
}
