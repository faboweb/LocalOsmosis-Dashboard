import Image from 'next/image';
import { FunctionComponent, useRef } from 'react';

import { RunWhenOnScreen } from '@/components/common/RunWhenOnScreen';
import { OperatorProps } from '@/components/pages/operator/types';
import { useFetchAddressTxs } from '@/hooks/data/useFetchAddressTxs';
import { useSwitchAddressPrefix } from '@/hooks/utils';

// TODO : probably keep the current validator / chain in redux at this point. Too much prop drilling
export const OperatorTxs: FunctionComponent<OperatorProps> = ({ data, chain }) => {
	const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
	const chainAddress = useSwitchAddressPrefix(data.address, chain);
	return (
		<div ref={ref}>
			<RunWhenOnScreen extraCondition={!!chainAddress} observingRef={ref} fallback={loader}>
				<OperatorsDisplay data={data} chain={chain} chainAddress={chainAddress as string} />
			</RunWhenOnScreen>
		</div>
	);
};

const OperatorsDisplay: FunctionComponent<OperatorProps & { chainAddress: string }> = ({
	data,
	chain,
	chainAddress,
}) => {
	const txs = useFetchAddressTxs(chainAddress, chain);
	console.log(txs);
	return (
		<table className="w-full">
			<TxTableHead />
			<TxTableBody data={data} chain={chain} />
		</table>
	);
};

// TODO : make a loader folder and import it from there for design consistency
const loader = (
	<div className="flex h-[482px] w-full items-center justify-center">
		<Image className="filter-white" width={80} height={80} src="/icons/generic/loading-spin.svg" alt="loader" />
	</div>
);

const TxTableBody: FunctionComponent<OperatorProps> = ({ data, chain }) => {
	console.log(data, chain);
	return (
		<tbody>
			<tr>
				<td>bit empty atm</td>
			</tr>
		</tbody>
	);
};

// const TxRow = (tx: Tx) => {
// 	return (
// 		<tr>
// 			<td scope="row"></td>
// 		</tr>
// 	);
// };

const tableColumns = ['Tx hash', 'Type', 'Result', 'Amount', 'Fee', 'Height', 'Time'];
const TxTableHead = () => {
	return (
		<thead className="h-12 w-full">
			<tr className="flex h-6 w-full items-center justify-between px-8">
				{tableColumns.map((column, index) => (
					<th scope="col" key={index} className="text-white.6">
						<p className="font-[400] text-white">{column}</p>
					</th>
				))}
			</tr>
		</thead>
	);
};
