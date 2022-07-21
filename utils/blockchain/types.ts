export interface ParsedTx {
	hash: string;
	type: string;
	result: boolean;
	amount: string;
	fee: string;
	height: number;
	timestamp: number;
}
