// https://cosmos.directory/ must be functional to work
// TODO : run our own nodes obviously

export enum Chain {
	'cosmos' = 'cosmoshub',
	'osmosis' = 'osmosis',
} // TODO : add more chains here

const baseRPC = 'https://rpc.cosmos.directory/';
const baseLCD = 'https://rest.cosmos.directory/';
const baseStatus = 'https://status.cosmos.directory/';

interface ChainEndpoint {
	rpc: string;
	lcd: string;
	status: string;
}

const ChainData = {} as Record<Chain, ChainEndpoint>;
Object.values(Chain).forEach((chain: Chain) => {
	ChainData[chain] = {
		rpc: `${baseRPC}${chain}`,
		lcd: `${baseLCD}${chain}`,
		status: `${baseStatus}${chain}`,
	};
});

export { ChainData };
