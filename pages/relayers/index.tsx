import { NextPage } from 'next';
import Link from 'next/link';

import { useAppSelector } from '@/hooks/store';
import { selectAvailableChains } from '@/store/features/chain/chainDataSlice';

const Relayers: NextPage = () => {
	const chains = useAppSelector(selectAvailableChains);
	return (
		<div className="wh-full flex flex-col items-center">
			<h3>Select chain</h3>
			<ul className="mt-10 flex w-full max-w-lg flex-row flex-wrap gap-y-1 gap-x-3 px-5">
				{chains.map(chain => (
					<Link href={`/relayers/${chain.name}`} key={chain.name}>
						<li className="hoverEff-txt p-2">
							<a>{chain.name}</a>
						</li>
					</Link>
				))}
			</ul>
		</div>
	);
};

export default Relayers;
