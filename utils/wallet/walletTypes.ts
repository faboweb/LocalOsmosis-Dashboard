export enum TxState {
	UNSIGNED = 'unsigned', //	needs user to sign TX
	SIGNED = 'signed', //	user has only signed TX
	PROCESSING = 'processing', //	user has signed and TX is being processed(sent to blockchain)
	CONFIRMED = 'confirmed', //	TX is confirmed on blockchain
	MIA = 'mia', //	TX was in processing longer than 10 blocks.
	FAILED = 'failed', //	TX failed to be confirmed on blockchain
	CANCELLED = 'cancelled', //	TX was canceled by user
}

export interface TxType {
	id: string;
	chainId: string;
	created: number; //	tx initially signed(if not signed, created)
	content: any;
	signedTx: string;

	state: TxState;
	timestamp: number; //	timestamp that Tx entered current state(to order txs in ones with latest updates)
}

export interface TxManagerState {
	processingTx: boolean;
	queuedTxs: TxType[];
	txHistory: {
		cancelled: TxType[];
		completed: TxType[];
	};
}
