import { OfflineDirectSigner, OfflineSigner } from '@cosmjs/proto-signing';
import { Keplr, Window as KeplrWindow } from '@keplr-wallet/types';

declare global {
	interface KeplrIntereactionOptions {
		readonly sign?: KeplrSignOptions;
	}

	export interface KeplrSignOptions {
		readonly preferNoSetFee?: boolean;
		readonly preferNoSetMemo?: boolean;
		readonly disableBalanceCheck?: boolean;
	}
	interface CustomKeplr extends Keplr {
		enable(chainId: string | string[]): Promise<void>;

		defaultOptions: KeplrIntereactionOptions;
	}
	interface Window extends KeplrWindow {
		keplr: CustomKeplr;
		getOfflineSigner: (chainId: string) => OfflineSigner & OfflineDirectSigner;
	}
}
