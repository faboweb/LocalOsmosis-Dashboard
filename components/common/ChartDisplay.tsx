import { useState } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { useStore } from '@/hooks/common/useStore';
import api from '@/utils/rpc';

import { DialogWrapper } from '@/components/common/DialogWrapper';
import { DisplayJson } from '@/components/common/DisplayJson';

export const ChartDisplay = () => {
	const [openBlock, setOpenBlock] = useState(null);

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
		plotOptions: {
			series: {
			  point: {
				events: {
				  async click() {
					setOpenBlock(await (await api).block(this.x))
				  }
				}
			  }
			}
	  },
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
		<div className="w-[80vw] mx-auto">
			<DialogWrapper isOpen={!!openBlock} setIsOpen={setOpenBlock}>
				{openBlock && <DisplayJson data={openBlock} />}
			</DialogWrapper>
			<HighchartsReact containerProps={{ style: { height: '100%' } }} highcharts={Highcharts} options={options} />
	);
};
