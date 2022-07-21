import Image from 'next/image';
import { FunctionComponent, useMemo, useRef } from 'react';

import Big from 'big.js';
import cn from 'clsx';
import sampleSize from 'lodash/sampleSize';
import ReactTooltip from 'react-tooltip';

import { useGetQuery } from '@/hooks/common/useGetQuery';
import { useAppSelector } from '@/hooks/store';
import { selectChainStatuses } from '@/store/features/chain/chainDataSlice';
import { Validator } from '@/utils/data/client/chain';
import { formatNum } from '@/utils/scripts';

// Note : ReactTooltip will stay visible on dev. No problem on PROD - https://github.com/wwayne/react-tooltip/issues/763
// TODO : Probably can extract a generic component but thinking it's not worth it atm
// TODO : find what heartbeats / Broadcaster are and add it properly
const broadcasterValueThresh = 99;
export const OperatorGrid: FunctionComponent<{ data: Validator }> = ({ data }) => {
	return (
		<section className="grid w-full grid-rows-[180px,minmax(412px,1fr)] gap-[72px]">
			<OperatorStatsGrid data={data} />
			<OperatorBlocksHeartbeat data={data} />
		</section>
	);
};

const gridClass = 'p-8 bg-white.02 rounded-2xl flex flex-col gap-4';
const totalBlocks = 100;
const OperatorBlocksHeartbeat: FunctionComponent<{ data: Validator }> = ({ data }) => {
	const chain = useGetQuery('chain');
	const chainStatuses = useAppSelector(selectChainStatuses);
	const height = useMemo(() => {
		if (!chain) return 0;
		const found = chainStatuses.find(status => status.name === chain);
		if (!found) return 0;
		return found.height;
	}, [chainStatuses, chain]);
	return (
		<div className="grid grid-cols-2 gap-6">
			<div className={gridClass}>
				<div className="flex items-center gap-2.5">
					<p className="text-white.6">Participated Blocks</p>
					<Image data-tip data-for="uptime-info2" width={20} height={20} src="/icons/generic/info.svg" />
					<ReactTooltip aria-haspopup="true" id="uptime-info2" place="top" type="dark" effect="solid">
						<p className="text-center text-xs">
							Replaced to participated blocks <br /> because uptime is already up there. <br /> Blocks are chosen at
							random
						</p>
					</ReactTooltip>
				</div>
				<h4>
					{totalBlocks - data.missedBlocks} / {totalBlocks}
				</h4>
				<div className="w-full pt-8">
					<DrawGrid
						missed={data.missedBlocks}
						total={totalBlocks}
						gapClass="gap-x-4 md:gap-x-[26px] gap-y-2 md:gap-y-4"
						blockClass="w-4 h-4 md:w-6 md:h-6 rounded-md md:rounded-lg"
						height={height}
					/>
				</div>
			</div>
			<div className={gridClass}>
				<div className="flex items-center gap-2.5">
					<p className="text-white.6">Heartbeats</p>
					<Image data-tip data-for="heartbeat-info2" width={20} height={20} src="/icons/generic/info.svg" />
					<ReactTooltip aria-haspopup="true" id="heartbeat-info2" place="top" type="dark" effect="solid">
						<p>What is a heartbeat? It&apos;s uptime atm</p>
					</ReactTooltip>
				</div>
				<h4>{data.uptime} / 100</h4>
				<div className="w-full pt-8">
					<DrawGrid
						missed={totalBlocks - Math.floor(data.uptime)}
						total={totalBlocks}
						gapClass="gap-x-4 md:gap-x-[26px] gap-y-2 md:gap-y-4"
						blockClass="w-4 h-4 md:w-6 md:h-6 rounded-md md:rounded-lg"
						height={height}
					/>
				</div>
			</div>
		</div>
	);
};

// TODO : Get actual block data that the validator failed to pariticipate in
// Currently just randomly picks blocks if uptime is not 100%
const DrawGrid: FunctionComponent<{
	missed: number;
	total: number;
	blockClass: string;
	gapClass: string;
	height: number;
}> = ({ missed, total, blockClass, gapClass, height }) => {
	// picks missed blocks randomly
	const ref = useRef<boolean[]>(
		(() => {
			const picked = sampleSize(
				Array.from({ length: total }, (_, k) => k),
				missed
			);
			return Array.from({ length: total }, (_, k) => !picked.includes(k));
		})()
	);
	return (
		<ul className={cn('flex items-center flex-wrap', gapClass)}>
			{ref.current.map((notMissed, key) => {
				const blockHeight = height - key;
				return (
					<li key={blockHeight}>
						<div
							data-tip
							data-for={`${blockHeight}-block`}
							className={cn(notMissed ? 'bg-green' : 'bg-negative', blockClass)}
						/>
						<ReactTooltip aria-haspopup="true" id={`${blockHeight}-block`} place="top" type="dark" effect="solid">
							<p>{formatNum(blockHeight)}</p>
						</ReactTooltip>
					</li>
				);
			})}
		</ul>
	);
};

const OperatorStatsGrid: FunctionComponent<{ data: Validator }> = ({ data }) => {
	const broadcasterRef = useRef(
		Math.max(new Big(data.uptime).minus(new Big(Math.random()).mul(2).toFixed(1)).toNumber(), 0)
	);
	return (
		<div className="grid grid-cols-3 gap-6">
			<div className={gridClass}>
				<div className="flex items-center gap-2.5">
					<p className="text-white.6">Uptimes</p>
					<Image data-tip data-for="uptime-info" width={20} height={20} src="/icons/generic/info.svg" />
					<ReactTooltip aria-haspopup="true" id="uptime-info" place="top" type="dark" effect="solid">
						<p>Uptime is a mild concept init?</p>
					</ReactTooltip>
				</div>
				<h4>{data.uptime}%</h4>
				<p className="text-white.6">Last 10,000 blocks</p>
			</div>
			<div className={gridClass}>
				<div className="flex items-center gap-2.5">
					<p className="text-white.6">Heartbeats</p>
					<Image data-tip data-for="heartbeat-info" width={20} height={20} src="/icons/generic/info.svg" />
					<ReactTooltip aria-haspopup="true" id="heartbeat-info" place="top" type="dark" effect="solid">
						<p>What is a heartbeat? It&apos;s uptime atm</p>
					</ReactTooltip>
				</div>
				<h4>{data.uptime}%</h4>
				<p className="text-white.6">Last 100 blocks</p>
			</div>
			<div className={gridClass}>
				<div className="flex items-center gap-2.5">
					<p className="text-white.6">Broadcaster</p>
					<Image data-tip data-for="broadcaster-info" width={20} height={20} src="/icons/generic/info.svg" />
					<ReactTooltip aria-haspopup="true" id="broadcaster-info" place="top" type="dark" effect="solid">
						<p>uptime - 0~2 applied atm, min value of 0 obviously</p>
					</ReactTooltip>
				</div>
				<h4 className={cn(broadcasterRef.current > broadcasterValueThresh ? 'text-green' : 'text-negative')}>
					{broadcasterRef.current}
				</h4>
				<p className="text-white.6">Last 100 blocks</p>
			</div>
		</div>
	);
};
