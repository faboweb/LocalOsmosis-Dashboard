// https://cosmos.directory/ must be functional to work
// TODO : run our own nodes obviously / make it less dependant on https://cosmos.directory/cosmoshub

type BaseUrl = 'rpc' | 'rest' | 'status' | 'chainData';
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
	};

	private chainDataMap: Record<ChainDataRoute, string> = {
		assets: 'assetlist',
	};

	public getBase(base: BaseUrl) {
		return this.baseUrls[base];
	}

	/**
	 * @desc chain data queriable via https://cosmos.directory/cosmoshub
	 * @param route ChainDataRoute
	 */
	public getChainData(route: ChainDataRoute, chain: string) {
		return `${this.baseUrls.rest}${chain}/${this.chainDataMap[route]}`;
	}

	// TODO : rpc related stuff
}

const urlBuilder = URLBuilder.Instance;
export { urlBuilder };
