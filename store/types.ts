export type Context = {
	txs: any[];
	nodeConfig: any;
	consensus: any[];
	proposals: any[];
	events: Record<string, any>;
	contracts: any[];
};
