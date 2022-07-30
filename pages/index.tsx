import type { NextPage } from 'next';

import { Card } from '@/components/common';
import { Consensus, Contracts, Events, NodeConfig, Txs } from '@/components/pages/home';

const Home: NextPage = () => {
	return (
		<div className="h-full w-full">
			<div className="grid h-full w-full grid-rows-2 gap-5 px-3">
				<div className="grid h-full w-full grid-cols-[2fr,2fr,1fr] gap-5">
					<Card>
						<Txs />
					</Card>
					<Card>
						<Consensus />
					</Card>
					<Card>
						<NodeConfig />
					</Card>
				</div>
				<div className="grid h-full w-full grid-cols-2 gap-5">
					<Card>
						<Events />
					</Card>
					<Card>
						<Contracts />
					</Card>
				</div>
			</div>
		</div>
	);
};

export default Home;
