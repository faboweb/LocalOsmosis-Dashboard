// https://cosmos.directory/ must be functional to work
// TODO : run our own nodes obviously / make it less dependant on https://cosmos.directory/cosmoshub

type BaseUrl = 'rpc' | 'rest' | 'status' | 'chainData' | 'validators';
type ChainDataRoute = 'assets';
// TODO : add rpc routes

class URLBuilder {
	private static _instance: URLBuilder;

	public static get Instance() {
		if (!this._instance) this._instance = new this();
		return this._instance;
	}

	private baseUrls: Record<BaseUrl, string> = {
		rpc: 'https://rpc.cosmos.directory/',
		rest: 'https://rest.cosmos.directory/',
		status: 'https://status.cosmos.directory/',
		chainData: 'https://chains.cosmos.directory/',
		validators: 'https://validators.cosmos.directory/chains/',
	};

	private chainDataMap: Record<ChainDataRoute, string> = {
		assets: 'assetlist',
	};

	public getBase(base: BaseUrl) {
		return this.baseUrls[base];
	}

	/**
	 * @desc general data queriable via https://cosmos.directory/cosmoshub
	 * @param route ChainDataRoute
	 */
	public getChainData(chain: string) {
		return `${this.baseUrls.chainData}${chain}`;
	}

	public getChainAssets(chain: string) {
		return `${this.baseUrls.chainData}${chain}/${this.chainDataMap.assets}`;
	}

	public getValidators(chain: string) {
		return `${this.baseUrls.validators}${chain}/`;
	}

	//  TODO : add pagination and more querying options
	public getAddressTxs(chain: string, address: string) {
		return `${this.baseUrls.rest}${chain}/cosmos/tx/v1beta1/txs?events=message.sender%3D%27${address}%27&pagination.limit=10&order_by=ORDER_BY_DESC`;
	}

	// TODO : rpc related stuff
}

const urlBuilder = URLBuilder.Instance;
export { urlBuilder };
