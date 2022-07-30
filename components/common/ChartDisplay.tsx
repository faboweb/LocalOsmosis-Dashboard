import { useState } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { DialogWrapper } from '@/components/common/DialogWrapper';
import { DisplayJson } from '@/components/common/DisplayJson';
import { useStore } from '@/hooks/common/useStore';
import api from '@/utils/rpc';

export const ChartDisplay = () => {
	const [openBlock, setOpenBlock] = useState<boolean>(false);

	const {
		state: { blocks },
	} = useStore();

	const dataTime = blocks
		? blocks.slice(0, blocks.length - 2).map((block, index) => ({
				y: blocks[index + 1].time - block.time,
				x: Number(block.height),
		  }))
		: [];

	const dataTxs = blocks
		? blocks.slice(0, blocks.length - 2).map(block => ({
				y: block.txs.length,
				x: Number(block.height),
		  }))
		: [];

	const options = {
		series: [
			{
				data: dataTime,
			},
			{
				data: dataTxs,
				yAxis: 1,
				type: 'column',
			},
		],
		legend: { enabled: false },
		plotOptions: {
			series: {
				point: {
					events: {
						async click() {
							setOpenBlock(await (await api).block(this.x));
						},
					},
				},
			},
		},
		chart: {
			backgroundColor: 'rgba(255,255,255,1)',
		},
		xAxis: {
			labels: { enabled: false },
			title: {
				text: null,
			},
		},
		yAxis: [
			{
				opposite: true,
				labels: { enabled: false },
				title: {
					text: null,
				},
			},
			{
				gridLineWidth: 0,
				labels: { enabled: false },
				title: {
					text: null,
				},
			},
		],
		title: {
			text: '',
		},
	};

	return (
		<div className="w-full h-full mx-auto">
			<DialogWrapper isOpen={!!openBlock} setIsOpen={setOpenBlock}>
				{openBlock && <DisplayJson data={openBlock} />}
			</DialogWrapper>
			<HighchartsReact containerProps={{ style: { height: '100%' } }} highcharts={Highcharts} options={options} />
		</div>
	);
};
