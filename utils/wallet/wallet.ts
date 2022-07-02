/**
 * @desc Currently connects to Keplr - expand in future
 * @desc Requests to sign in order
 * @desc TODO : If transactions are queued, automatically waits until the next block to send transaction,
 * 							sends them in succession. Should be cancellable if not sent yet
 */
import { Nullable } from '@/utils/types/utils';
import { TxManager } from '@/utils/wallet/tx-manager';
import { runOnDocumentStateChange } from '@/utils/wallet/utils';

interface WalletState {
	walletLoading?: Nullable<boolean>;
	txManager: TxManager;
}

export class Wallet {
	private static _instance: Wallet;

	public static get Instance() {
		if (!this._instance) this._instance = new this();
		return this._instance;
	}

	private _state: WalletState = {
		walletLoading: null,
		txManager: new TxManager(),
	};

	private wallet: CustomKeplr | undefined;

	constructor() {
		if (window.keplr) {
			this._state.walletLoading = false;
			this.wallet = window.keplr;
		} else {
			this._state.walletLoading = true;
			runOnDocumentStateChange(() => {
				this.wallet = window.keplr;
			});
		}
	}

	public async init(): Promise<boolean> {
		if (this._state.walletLoading) {
			return new Promise(resolve => {
				runOnDocumentStateChange(res => resolve(res));
			});
		}
		if (!this.wallet) {
			return new Promise(resolve => {
				runOnDocumentStateChange(res => resolve(res));
			});
		}
		return true;
	}
}

const wallet = Wallet.Instance;

export { wallet };
