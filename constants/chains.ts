export type SupportedChain = 'cosmos' | 'addmorechainshere';
// TODO : add a mainnet chain id mapper?

interface ChainEndpoint {
	lcd: string;
	rpc: string;
}

export const ChainData: Record<SupportedChain, ChainEndpoint> = {
	cosmos: {
		lcd: 'https://cosmoshub.stakesystems.io',
		rpc: 'https://rpc.cosmos.network',
	},
};
