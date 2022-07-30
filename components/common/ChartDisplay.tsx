import { useEffect } from 'react';

import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	TimeSeriesScale,
	Title,
	Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { useStore } from '@/hooks/common/useStore';
import api from '@/utils/rpc';

ChartJS.register(CategoryScale, TimeSeriesScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const ChartDisplay = () => {
	const {
		state: { blocks },
		pushBlocks,
	} = useStore();

	useEffect(() => {
		api.then(data => data.blocks().then(pushBlocks));
	}, []);

	const data = blocks.slice(0, blocks.length - 2).map((block, index) => ({
		y: new Date(blocks[index + 1].block.header.time).getTime() - new Date(block.block.header.time).getTime(),
		x: Number(block.block.header.height),
	}));

	return (
		<Line
			options={{
				scales: {
					x: {
						type: 'linear',
						display: false,
					},
					y: {
						display: false,
					},
				},
				plugins: {
					legend: {
						display: false,
					},
					title: {
						display: false,
					},
				},
			}}
			data={{
				datasets: [
					{
						data,
						borderColor: 'white',
					},
				],
			}}
			height={50}
			responsive={true}
		/>
	);
};
