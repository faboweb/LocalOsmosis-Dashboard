import Image from 'next/image';
import { FunctionComponent, useRef } from 'react';

import cn from 'clsx';

import { DisplayAmount } from '@/components/common/DisplayAmount';
import { RunWhenOnScreen } from '@/components/common/RunWhenOnScreen';
import { OperatorProps } from '@/components/pages/operator/types';
import { useGetChainDisplay, useSwitchAddressPrefix } from '@/hooks/blockchain';
import { useFetchAddressTxs } from '@/hooks/data/useFetchAddressTxs';
import { ParsedTx, parseTx } from '@/utils/blockchain';
import { Tx } from '@/utils/data/client/chain';
import { timeAgo, truncateMiddle } from '@/utils/scripts';

const columnWidths = [
	'w-[14.972%]',
	'w-[17.101%]',
	'w-[12.980%]',
	'w-[14.972%]',
	'w-[15.041%]',
	'w-[21.909%]',
	'w-[9.890%]',
];
const tableColumns = ['Tx hash', 'Type', 'Result', 'Amount', 'Fee', 'Height', 'Time'];

// TODO : probably keep the current validator / chain in redux at this point. Too much prop drilling
export const OperatorTxs: FunctionComponent<OperatorProps> = ({ data, chain }) => {
	const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
	const chainAddress = useSwitchAddressPrefix(data.address, chain);
	return (
		<div className="w-full min-w-[1280px]" ref={ref}>
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
			{txs?.length > 0 && txs.map(tx => <TxRow key={tx.txhash} tx={tx} chain={chain} />)}
			{fetching && txs?.length === 0 && <TableLoading />}
			{!fetching && txs?.length === 0 && <TableEmpty />}
		</tbody>
	);
};

const TxRow: FunctionComponent<{ tx: Tx; chain: string }> = ({ tx, chain }) => {
	const ref = useRef<ParsedTx>(parseTx(tx));
	const data = ref.current;
	const { getTxPage, decimals, denom } = useGetChainDisplay(chain);
	return (
		<tr className="flex h-[66px] w-full items-center rounded-2xl bg-white.02 py-[21px] px-8 font-[400] text-white.6">
			<td className={cn(columnWidths[0], 'pr-4')} scope="row">
				<a href={getTxPage(data.hash)} className="hoverEff" target="_blank" rel="noopener noreferrer">
					<p className="truncate text-accent">{truncateMiddle(data.hash, 6, 6)}</p>
				</a>
			</td>
			<td className={cn(columnWidths[1], 'pr-4')} scope="row">
				<p className="truncate">{data.type}</p>
			</td>
			<td className={cn(columnWidths[2], 'pr-4')} scope="row">
				<p>{data.result ? 'Success' : 'Fail'}</p>
			</td>
			<td className={cn(columnWidths[3], 'pr-4')} scope="row">
				<p>
					<DisplayAmount amount={data.amount} denom={denom} decimals={decimals} />
				</p>
			</td>
			<td className={cn(columnWidths[4], 'pr-4')} scope="row">
				<p>
					<DisplayAmount amount={data.fee} denom={denom} decimals={decimals} />
				</p>
			</td>
			<td className={cn(columnWidths[5], 'pr-4')} scope="row">
				<p>{data.height}</p>
			</td>
			<td className={columnWidths[6]} scope="row">
				<p>{timeAgo.format(data.timestamp * 1000, 'mini-now')} ago</p>
			</td>
		</tr>
	);
};

const TxTableHead = () => {
	return (
		<thead className="h-12 w-full">
			<tr className="flex h-6 w-full items-center px-8">
				{tableColumns.map((column, index) => (
					<th scope="col" key={index} className={cn('text-white.6 text-left pr-2 last:pr-0', columnWidths[index])}>
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
