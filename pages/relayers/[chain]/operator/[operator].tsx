import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FunctionComponent, useEffect, useState } from 'react';

import isEmpty from 'lodash/isEmpty';

import { RouterLoaded } from '@/components/common';
import { OperatorBasic } from '@/components/pages/operator';
import { OperatorGrid } from '@/components/pages/operator/OperatorGrid';
import { useFetchValidators } from '@/hooks/data/useFetchValidators';
import { Validator } from '@/utils/data/client/chain';

const OperatorPage: NextPage = () => {
	// TODO : validate general & operator address before rendering
	return (
		<div className="h-full px-20 pt-[30px] pb-[90px] lg:mx-auto lg:px-0">
			<RouterLoaded fallback={<Loading />}>
				<Operator />
			</RouterLoaded>
		</div>
	);
};

const Operator = () => {
	const router = useRouter();
	const { chain, operator } = router.query as { chain: string; operator: string };

	const validators = useFetchValidators(chain);

	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<Validator>();

	useEffect(() => {
		if (!operator) {
			setError('No operator address');
			return;
		}
		if (isEmpty(validators)) return;
		const found = validators.find(validator => validator.address === operator);
		if (found) setData(found);
	}, [validators, operator]);
	return (
		<>
			{error && <div className="text-red-500">{error}</div>}
			{!error && !data && <Loading />}
			{!error && data && <DisplayOperator data={data} />}
		</>
	);
};

const DisplayOperator: FunctionComponent<{ data: Validator }> = ({ data }) => {
	console.log(data);
	return (
		<div className="mx-auto lg:w-lg">
			<OperatorBasic data={data} />
			<section className="mt-[72px]">
				<OperatorGrid data={data} />
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
