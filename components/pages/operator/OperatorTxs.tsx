import Image from 'next/image';
import { FunctionComponent, useEffect, useRef } from 'react';

import cn from 'clsx';

import { Img } from '@/components/common';
import { DisplayAmount } from '@/components/common/DisplayAmount';
import { RunWhenOnScreen } from '@/components/common/RunWhenOnScreen';
import { OperatorProps } from '@/components/pages/operator/types';
import { useGetChainDisplay, useSwitchAddressPrefix } from '@/hooks/blockchain';
import { usePagination } from '@/hooks/common/usePagination';
import { useFetchAddressTxs } from '@/hooks/data/useFetchAddressTxs';
import { ParsedTx, parseTx } from '@/utils/blockchain';
import { Tx } from '@/utils/data/client/chain';
import { getPaginationArray, timeAgo, truncateMiddle } from '@/utils/scripts';

const columnWidths = [
	'w-[14.972%]',
	'w-[20.101%]',
	'w-[20.972%]',
	'w-[17.041%]',
	'w-[10.980%]',
	'w-[13.909%]',
	'w-[7.890%]',
];
const tableColumns = ['Tx hash', 'Type', 'Amount', 'Fee', 'Result', 'Height', 'Time'];

// TODO : probably keep the current validator / chain in redux at this point. Too much prop drilling
export const OperatorTxs: FunctionComponent<OperatorProps> = ({ data, chain }) => {
	const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
	const chainAddress = useSwitchAddressPrefix(data.address, chain);
	return (
		<div className="w-full" ref={ref}>
			<RunWhenOnScreen extraCondition={!!chainAddress} observingRef={ref} fallback={loader}>
				<TxTable chain={chain} chainAddress={chainAddress as string} />
			</RunWhenOnScreen>
		</div>
	);
};

const ROWS_PER_PAGE = 5;
const TxTable: FunctionComponent<{ chain: string; chainAddress: string }> = ({ chain, chainAddress }) => {
	const { addressTxs: txs, fetching } = useFetchAddressTxs(chainAddress, chain);
	const { values, current, total, setPage, setValues } = usePagination<Tx>(ROWS_PER_PAGE);
	useEffect(() => {
		if (!fetching && txs.length > 0) {
			setValues(txs);
		}
	}, [txs, fetching]);
	return (
		<>
			<div className="max-w-[calc(100vw-40px)] overflow-x-auto md:max-w-[calc(100vw-160px)] sm:max-w-[calc(100vw-80px)]">
				<table className="w-full min-w-[1280px]">
					<TxTableHead />
					<TxTableBody txs={values} fetching={fetching} chain={chain} />
				</table>
			</div>
			<div className="mt-12">
				<TxTablePagination current={current} setPage={setPage} total={total} />
			</div>
		</>
	);
};

interface PaginationProps {
	current: number;
	total: number;
	setPage: (page: number) => void;
}

const TxTablePagination: FunctionComponent<PaginationProps> = ({ current, total, setPage }) => {
	const pages = getPaginationArray(total, current);
	const leftArrowActive = current > 0 && current < total;
	const rightArrowActive = current < total - 1;
	return (
		<div className="flex w-full items-center justify-center gap-2">
			<button
				onClick={() => {
					if (leftArrowActive) setPage(current - 1);
				}}
				type="button"
				className={cn({ 'cursor-not-allowed': !leftArrowActive }, 'w-6 h-6')}>
				<Image
					className={cn('rotate-90 filter-accent', { 'opacity-20': !leftArrowActive })}
					width={24}
					height={24}
					src="/icons/generic/arrowhead-down.svg"
				/>
			</button>
			{pages.map(page => (
				<button className="px-2" key={page} onClick={() => setPage(page - 1)}>
					<p className={cn(current === page - 1 ? 'text-white' : 'text-white.6', 'leading-none')}>{page}</p>
				</button>
			))}
			<button
				onClick={() => {
					if (rightArrowActive) setPage(current + 1);
				}}
				type="button"
				className={cn({ 'cursor-not-allowed': !rightArrowActive }, 'w-6 h-6')}>
				<Image
					className={cn('rotate-[270deg] filter-accent', { 'opacity-20': !rightArrowActive })}
					width={24}
					height={24}
					src="/icons/generic/arrowhead-down.svg"
				/>
			</button>
		</div>
	);
};

const TxTableBody: FunctionComponent<{ txs: Tx[]; fetching: boolean; chain: string }> = ({ txs, fetching, chain }) => {
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
				<p>
					<DisplayAmount amount={data.amount} denom={denom} decimals={decimals} />
				</p>
			</td>
			<td className={cn(columnWidths[3], 'pr-4')} scope="row">
				<p>
					<DisplayAmount amount={data.fee} denom={denom} decimals={decimals} />
				</p>
			</td>
			<td className={cn(columnWidths[4], 'pr-4')} scope="row">
				<p>{data.result ? 'Success' : 'Fail'}</p>
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
		<tr className="flex w-full max-w-[calc(100vw-80px)] items-center justify-center md:max-w-[calc(100vw-160px)]">
			<td className="mt-4 flex flex-col items-center gap-2">
				<Img className="filter-white h-12 w-12" alt="missing" src="/icons/generic/missing.svg" />
				<p>No data</p>
			</td>
		</tr>
	);
};

const loader = (
	<div className="flex h-[482px] w-full items-center justify-center">
		<Image className="filter-white" width={80} height={80} src="/icons/generic/loading-spin.svg" alt="loader" />
	</div>
);
