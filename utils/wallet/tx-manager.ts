import { TxManagerState, TxState, TxType } from '@/utils/wallet/walletTypes';

export class TxManager {
	private _state: TxManagerState;

	constructor() {
		this._state = {
			processingTx: false,
			queuedTxs: [],
			txHistory: {
				cancelled: [],
				completed: [],
			},
		};
	}

	// private getOfflineSigner(chainId: string): OfflineSigner | OfflineDirectSigner {
	// 	return window.getOfflineSigner(chainId);
	// }

	get isProcessing() {
		return this._state.processingTx;
	}

	pushTx(tx: TxType) {
		this._state.queuedTxs.push(tx);
	}

	public async signNextUnsignedTx(): void {
		if (this.isProcessing) return;
		if (this._state.queuedTxs.length === 0) return;
		const toSignTx = this._state.queuedTxs.find(tx => tx.state === TxState.UNSIGNED);
		if (!toSignTx) return;
		this._state.processingTx = true;
		// TODO : carry on here @fl-y
		// const offlineSigner = window.getOfflineSigner(toSignTx.chainId);
		// const accounts = await offlineSigner.getAccounts();
		// const client = await SigningStargateClient.connectWithSigner(urlBuilder.getBase('rpc'), offlineSigner);
	}
}
