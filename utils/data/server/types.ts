export interface ChainStatus {
	name: string;
	available: boolean; //	rpc, rest are both available. TODO : add statuses of both and make UI aware of which is available
}

export interface ServerSideProps {
	chainStatuses: ChainStatus[];
}
