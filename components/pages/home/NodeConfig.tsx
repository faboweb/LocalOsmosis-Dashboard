import { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react';

import Big from 'big.js';
import cn from 'clsx';
import copy from 'copy-to-clipboard';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';

import { Loader } from '@/components/common/Loader';
import { useStore } from '@/hooks/common/useStore';
import { NodeConfig as NodeConfigType } from '@/store/store';
import { formatNum } from '@/utils/scripts';

export const NodeConfig: FunctionComponent = () => {
	const {
		state: { nodeConfig },
	} = useStore();
	return (
		<div className="h-full w-full">
			{!isEmpty(nodeConfig) ? <DisplayData data={nodeConfig as NodeConfigType} /> : <Loader />}
		</div>
	);
};

const DisplayData: FunctionComponent<{ data: NodeConfigType }> = ({ data }) => {
	return (
		<div className="w-full h-full grid grid-cols-2">
			<div className="flex flex-col gap-3 justify-around">
				<p
					onClick={() => {
						toast('Copied to clipboard', { autoClose: 250 });
						copy(JSON.stringify(data));
					}}
					className="text-center hover:text-accent cursor-pointer">
					Node Info
				</p>
				<Item label="moniker" content={data.moniker} />
				<Item label="network" content={data.network} />
				<Item label="version" content={data.version} />
			</div>
			<DisplayStatus />
		</div>
	);
};

const DisplayStatus = () => {
	const {
		state: { blocks },
	} = useStore();

	const dataTime = blocks
		? blocks.slice(0, blocks.length - 2).map((block, index) => ({
				y: blocks[index + 1].time - block.time,
				x: Number(block.height),
		  }))
		: [];

	const avg = useMemo(() => {
		if (dataTime.length === 0) return 0;
		return new Big(dataTime.reduce((acc, curr) => acc + curr.y, 0) / dataTime.length).div(1000).toFixed(3);
	}, [dataTime]);

	const curBlock = useMemo(() => {
		if (blocks.length === 0) return undefined;
		return <CurrentBlock time={blocks[blocks.length - 1].time} avg={Number(avg)} />;
	}, [blocks[blocks.length - 1]?.time, avg]);

	return (
		<div className="flex flex-col gap-3 justify-around">
			<p className="text-center">Blockchain status</p>
			{!isEmpty(blocks) && <Item label="height" content={formatNum(blocks[blocks.length - 1]?.height)} />}
			<Item label="Avg Block Time" content={`${avg}s`} />
			{curBlock}
		</div>
	);
};

const CurrentBlock: FunctionComponent<{ time: number; avg: number }> = ({ time, avg }) => {
	const ref = useRef<number>();
	const [timeDiff, setTimeDiff] = useState<number>(0);

	useEffect(() => {
		ref.current = time;
	}, [time]);

	useEffect(() => {
		setInterval(() => {
			setTimeDiff(Math.ceil((Date.now() - ref.current) / 1000));
		}, 1000);
	}, []);

	return (
		<div className="w-full">
			<p className="text-center text-[14px] leading-none tracking-tighter overflow-auto text-white.6">
				Last Block Time
			</p>
			<p
				className={cn('text-center text-[16px] leading-none tracking-tighter font-mono', {
					'text-red-500': new Big(timeDiff).minus(avg).gte(avg * 3),
				})}>
				{Math.max(new Big(timeDiff).minus(avg).div(10).prec(1).mul(10).toNumber(), 0)}s ago
			</p>
		</div>
	);
};

const Item: FunctionComponent<{ label: string; content: any }> = ({ label, content }) => {
	return (
		<div className="w-full">
			<p className="text-center text-[14px] leading-none tracking-tighter overflow-auto text-white.6">{label}</p>
			<p
				onClick={() => {
					copy(content.toString());
					toast('Copied to clipboard', { autoClose: 250 });
				}}
				className="text-center text-[16px] leading-none tracking-tighter truncate hover:text-accent cursor-pointer font-mono">
				{content.toString()}
			</p>
		</div>
	);
};
