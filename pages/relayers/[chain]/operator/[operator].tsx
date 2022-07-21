import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FunctionComponent, useEffect, useState } from 'react';

import isEmpty from 'lodash/isEmpty';

import { RouterLoaded } from '@/components/common';
import { OperatorBasic, OperatorGrid, OperatorProps, OperatorSearch, OperatorTxs } from '@/components/pages/operator';
import { useFetchValidators } from '@/hooks/data/useFetchValidators';
import { Validator } from '@/utils/data/client/chain';

const OperatorPage: NextPage = () => {
	// TODO : validate general & operator address before rendering
	return (
		<div className="h-full px-5 pt-[30px] pb-[90px] lg:mx-auto lg:px-0 md:px-20 sm:px-10">
			<RouterLoaded fallback={<Loading />}>
				<Operator />
			</RouterLoaded>
		</div>
	);
};

// TODO : refactor s.t. chain is set in redux store instead of prop drilling
const Operator = () => {
	const router = useRouter();
	const { chain, operator } = router.query as { chain: string; operator: string };

	const validators = useFetchValidators(chain);

	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<Validator>();

	useEffect(() => {
		if (data) return;
		if (!operator) {
			setError('No operator address');
			return;
		}
		if (isEmpty(validators)) return;
		const found = validators.find(validator => validator.address === operator);
		if (found) setData(found);
		else setError('Operator was not found');
	}, [validators, operator, data]);
	return (
		<>
			{error && (
				<div className="wh-full mt-20 flex flex-col items-center">
					<p className="text-negative">{error}</p>
				</div>
			)}
			{!error && !data && <Loading />}
			{!error && data && chain && <DisplayOperator data={data} chain={chain} />}
		</>
	);
};

const DisplayOperator: FunctionComponent<OperatorProps> = ({ data, chain }) => {
	return (
		<div className="mx-auto flex w-full flex-col gap-6 lg:w-lg md:gap-[72px]">
			<section>
				<OperatorBasic data={data} chain={chain} />
			</section>
			<section>
				<OperatorGrid data={data} />
			</section>
			<section>
				<OperatorSearch />
			</section>
			<section className="max-w-[calc(100vw-80px)] overflow-x-auto md:max-w-[calc(100vw-160px)]">
				<OperatorTxs data={data} chain={chain} />
			</section>
		</div>
	);
};

const Loading = () => {
	return (
		<div className="wh-full flex justify-center">
			<img alt="spinner" className="filter-white mt-[15vh] h-20 w-20" src="/icons/generic/loading-spin.svg" />
		</div>
	);
};

export default OperatorPage;
