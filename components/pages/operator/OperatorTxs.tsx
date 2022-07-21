import Image from 'next/image';
import { FunctionComponent, useRef } from 'react';

import { RunWhenOnScreen } from '@/components/common/RunWhenOnScreen';
import { OperatorProps } from '@/components/pages/operator/types';
import { useFetchAddressTxs } from '@/hooks/data/useFetchAddressTxs';
import { useSwitchAddressPrefix } from '@/hooks/utils';
import { ParsedTx, parseTx } from '@/utils/blockchain';
import { Tx } from '@/utils/data/client/chain';

// TODO : probably keep the current validator / chain in redux at this point. Too much prop drilling
export const OperatorTxs: FunctionComponent<OperatorProps> = ({ data, chain }) => {
	const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
	const chainAddress = useSwitchAddressPrefix(data.address, chain);
	return (
		<div ref={ref}>
			<RunWhenOnScreen extraCondition={!!chainAddress} observingRef={ref} fallback={loader}>
				<table className="w-full">
					<TxTableHead />
					<TxTableBody chainAddress={chainAddress as string} chain={chain} />
				</table>
			</RunWhenOnScreen>
		</div>
	);
};

const TxTableBody: FunctionComponent<{ chain: string; chainAddress: string }> = ({ chain, chainAddress }) => {
	const { addressTxs: txs, fetching } = useFetchAddressTxs(chainAddress, chain);
	return (
		<tbody className="flex flex-col gap-2">
			{txs?.length > 0 && txs.map(tx => <TxRow key={tx.txhash} tx={tx} />)}
			{fetching && txs?.length === 0 && <TableLoading />}
			{!fetching && txs?.length === 0 && <TableEmpty />}
		</tbody>
	);
};

const TxRow: FunctionComponent<{ tx: Tx }> = ({ tx }) => {
	const ref = useRef<ParsedTx>(parseTx(tx));
	console.log(ref.current);
	return (
		<tr className="h-[66px] w-full rounded-2xl bg-white.02 py-[21px] px-[32px]">
			<td scope="row"></td>
		</tr>
	);
};

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

// TODO : make a loader folder and import it from there for design consistency
const TableLoading = () => {
	return (
		<>
			{Array.from({ length: 5 }, (_, key) => (
				<tr key={key} className="flex w-full items-center justify-between px-8">
					<td className="h-[66px] w-full">
						<div className="rowLoading-animation h-full" />
					</td>
				</tr>
			))}
		</>
	);
};

const TableEmpty = () => {
	return (
		<tr className="flex w-full items-center justify-center">
			<td className="flex flex-col items-center">No data</td>
		</tr>
	);
};

const loader = (
	<div className="flex h-[482px] w-full items-center justify-center">
		<Image className="filter-white" width={80} height={80} src="/icons/generic/loading-spin.svg" alt="loader" />
	</div>
);
