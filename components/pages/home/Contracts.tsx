import Image from 'next/image';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';

import cn from 'clsx';
import isEmpty from 'lodash/isEmpty';

import { DialogWrapper } from '@/components/common/DialogWrapper';
import { DisplayJson } from '@/components/common/DisplayJson';
import { usePagination } from '@/hooks/common/usePagination';
import { useStore } from '@/hooks/common/useStore';
import { getPaginationArray, truncateMiddle } from '@/utils/scripts';

import api from '../../../utils/rpc';

export const Contracts: FunctionComponent = () => {
	const {
		state: { contracts },
	} = useStore();
	const [isOpen, setIsOpen] = useState(false);
	const [modalData, setModalData] = useState();
	const [history, setHistory] = useState([]);
	const [siblings, setSiblings] = useState([]);

	const loadSibling = async addr => {
		setHistory([]);
		setSiblings([]);
		const sibling = contracts.find(({ address }) => addr === address);
		setModalData(sibling);
		setHistory(await (await api).contractHistory(sibling.address));
		setSiblings((await (await api).contractSiblings(sibling.codeId)).filter(x => x !== sibling.address));
	};
	const onClick = useCallback(async (data: any) => {
		setModalData(data);
		setHistory([]);
		setSiblings([]);
		setIsOpen(prevState => !prevState);
		setHistory(await (await api).contractHistory(data.address));
		setSiblings((await (await api).contractSiblings(data.codeId)).filter(x => x !== data.address));
	}, []);
	return (
		<div className="min-h-[352px] flex flex-col gap-2 justify-center h-full">
			<DialogWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
				<div className="w-full h-full items-center justify-center mb-8">
					<h4 className="mb-4 mt-4">Contract</h4>
					<DisplayJson data={modalData} collapseStringsAfterLength={100} />
					<h4 className="mb-4 mt-4">History</h4>
					<DisplayJson data={history} collapseStringsAfterLength={100} />
					<h4 className="mb-4 mt-4">Siblings</h4>
					{siblings.length > 0 ? (
						<ul className="flex flex-col mb-4">
							{siblings.map((addr, index) => (
								<li key={index} className="hover:text-accent transition-colors duration-200 cursor-pointer">
									<a onClick={() => loadSibling(addr)}>{addr}</a>
								</li>
							))}
						</ul>
					) : (
						<span>No Siblings</span>
					)}
				</div>
			</DialogWrapper>
			<p className="text-center">Contracts</p>
			{!isEmpty(contracts) && <DisplayContracts contracts={contracts} onClick={onClick} />}
		</div>
	);
};

const PAGE_SIZE = 12;
const DisplayContracts: FunctionComponent<{ contracts: any[]; onClick: (value: any) => void }> = ({
	contracts,
	onClick,
}) => {
	const { values, current, total, setPage, setValues } = usePagination<any>(PAGE_SIZE);
	useEffect(() => {
		setValues(contracts);
	}, [contracts]);
	return (
		<>
			<ul className="flex flex-col items-center">
				{!isEmpty(values) &&
					values.map(contract => (
						<li
							onClick={() => onClick(contract)}
							className="flex items-center gap-5 hover:text-accent cursor-pointer"
							key={contract.address}>
							<p className="text-[12px]">
								{contract.codeId} - {contract.label}
							</p>
							<p className="text-[14px]">{truncateMiddle(contract.address, 8, 8)}</p>
						</li>
					))}
			</ul>
			<TxTablePagination total={total} setPage={setPage} current={current} />
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
