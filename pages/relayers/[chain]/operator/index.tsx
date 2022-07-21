import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { RouterLoaded } from '@/components/common';
import { useFetchValidators } from '@/hooks/data/useFetchValidators';

const Operator: NextPage = () => {
	return (
		<div className="wh-full flex flex-col items-center">
			<h3 className="mt-10">Operator List</h3>
			<div className="mt-10 px-10">
				<RouterLoaded>
					<OperatorList />
				</RouterLoaded>
			</div>
		</div>
	);
};

// TODO : wrap in Error boundary and display error if fetch fails
const OperatorList = () => {
	const router = useRouter();
	const { chain } = router.query as { chain: string };
	const validators = useFetchValidators(chain);

	return (
		<>
			{validators?.length > 0 ? (
				<div className="rounded-2xl border border-accent p-5 ">
					<ul className="flex max-h-[500px] max-w-[800px] flex-wrap items-center gap-x-3 gap-y-2 overflow-auto">
						{validators.map(validator => (
							<li className="hoverEff-txt p-2" key={validator.address}>
								<Link href={`${router.asPath}/${validator.address}`}>
									<p className="text-center">{validator.moniker}</p>
								</Link>
							</li>
						))}
					</ul>
				</div>
			) : (
				<div className="mt-10">
					<img alt="spinner" className="filter-white h-20 w-20" src="/icons/generic/loading-spin.svg" />
				</div>
			)}
		</>
	);
};

export default Operator;
