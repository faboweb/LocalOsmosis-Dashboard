export type Context = {
	txs: any[];
	nodeConfig: any;
	blocks: any[];
	proposals: any[];
	events: Record<string, any[]>;
	contracts: any[];
};
