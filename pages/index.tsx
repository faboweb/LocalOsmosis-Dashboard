import type { NextPage } from 'next';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	TimeSeriesScale
  } from 'chart.js'
  import { Chart } from 'react-chartjs-2'
  
  ChartJS.register(
	CategoryScale,
	TimeSeriesScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
  )

import { Card } from '@/components/common';
import { Consensus, Contracts, Events, NodeConfig, Txs } from '@/components/pages/home';
import { useEffect } from 'react';
import api from '@/utils/rpc';
import { useStore } from '@/hooks/common/useStore';

const Home: NextPage = () => {
	const {
		state: { blocks },
		pushBlocks,
	} = useStore();

	useEffect(() => {
		api.then(api => api.blocks().then(pushBlocks))
	}, []);

	const data = blocks.slice(0, blocks.length - 2).map((block, index) => ({
		y: new Date(blocks[index+1].block.header.time).getTime() - new Date(block.block.header.time).getTime(),
		x: Number(block.block.header.height)
	}))
	return (
		<div className="h-full w-full">
			<Line options={{
					scales: {
						x: {
							type: 'linear',
							display: false
						},
						y: {
							display: false
						}
					},
					plugins: {
						legend: {
							display: false
						},
						title: {
							display: false
						}
					}
				}} 
				data={{
				datasets: [{
					data: data,
					borderColor: 'white',
				}]
			}} />
			<div className="grid h-full w-full grid-rows-2 gap-5 px-3">
				<div className="grid h-full w-full grid-cols-3 gap-5">
					<Card>
						<Txs />
					</Card>
					<Card>
						<NodeConfig />
					</Card>
					<Card>
						<Consensus />
					</Card>
				</div>
				<div className="grid h-full w-full grid-cols-2 gap-5">
					<Card>
						<Events />
					</Card>
					<Card>
						<Contracts />
					</Card>
				</div>
			</div>
		</div>
	);
};

export default Home;
