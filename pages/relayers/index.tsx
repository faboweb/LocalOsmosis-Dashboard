import { NextPage } from 'next';
import Link from 'next/link';

import { useAppSelector } from '@/hooks/store';
import { selectAvailableChains } from '@/store/features/chain/chainDataSlice';

const Relayers: NextPage = () => {
	const chains = useAppSelector(selectAvailableChains);
	console.log(chains);
	return (
		<div className="wh-full flex flex-col items-center">
			<h3 className="mt-10">Select chain</h3>
			<p className="text-sm">(unstyled - minimal please don&apos;t grade me with this)</p>
			<ul className="mt-10 flex flex-col items-center gap-5">
				{chains.map(chain => (
					<li className="hoverEff p-4" key={chain.name}>
						<Link href={`/relayers/${chain.name}`}>
							<p>{chain.name}</p>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Relayers;
