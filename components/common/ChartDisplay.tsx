import { useCallback, useEffect } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import isEmpty from 'lodash/isEmpty';

import { useStore } from '@/hooks/common/useStore';
import api from '@/utils/rpc';

export const ChartDisplay = () => {
	const {
		state: { blocks },
	} = useStore();

	const data = blocks
		? blocks.slice(0, blocks.length - 2).map((block, index) => ({
				y: blocks[index + 1].time - block.time,
				x: Number(block.height),
		  }))
		: [];

	const options = {
		title: {
			text: 'Block Times',
		},
		chart: {
			backgroundColor: 'rgba(255,255,255,1)',
		},
		xAxis: {
			title: '',
			gridLineWidth: 0,
			minPadding: 0,
			maxPadding: 0,
		},
		legend: {
			enabled: false,
		},
		yAxis: {
			title: '',
			gridLineWidth: 0,
			minPadding: 0,
			maxPadding: 0,
		},
		series: [
			{
				name: 'Block Time',
				data,
			},
		],
		tooltip: {
			enabled: true,
			backgroundColor: '#ffffff',
			borderColor: '#e6e6e6',
			borderRadius: 10,
			borderWidth: 1,
			headerShape: 'callout',
			shadow: true,
			useHTML: true,
		},
		credits: {
			enabled: false,
		},
	};

	return (
		<div className="w-full h-full mx-auto">
			{!isEmpty(data) && (
				<HighchartsReact containerProps={{ style: { height: '100%' } }} highcharts={Highcharts} options={options} />
			)}
		</div>
	);
};
