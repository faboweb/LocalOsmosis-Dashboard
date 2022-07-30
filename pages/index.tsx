import type { NextPage } from 'next';

import { Card } from '@/components/common';
import { ChartDisplay } from '@/components/common/ChartDisplay';
import { Consensus, Contracts, Events, NodeConfig, Txs } from '@/components/pages/home';

const Home: NextPage = () => {
	return (
		<div className="h-full w-full">
			<div className="grid h-full w-full grid-rows-[200px,1fr,1fr] gap-5 px-3">
				<div className="grid h-full w-full grid-cols-2 gap-5">
					<Card>
						<ChartDisplay />
					</Card>
					<Card>
						<NodeConfig />
					</Card>
				</div>
				<div className="grid h-full w-full grid-cols-2 gap-5">
					<Card>
						<Txs />
					</Card>
					<Card>
						<Contracts />
					</Card>
				</div>
				<div className="grid h-full w-full grid-cols-2 gap-5">
					<Card>
						<Events />
					</Card>
					<Card>
						<Consensus />
					</Card>
				</div>
			</div>
		</div>
	);
};

export default Home;
