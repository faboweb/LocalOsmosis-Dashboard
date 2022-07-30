import { useEffect } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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
		series: [
			{
				data,
			},
		],
	};

	return (
		<div className="w-[80vw] mx-auto">
			<HighchartsReact containerProps={{ style: { height: '100%' } }} highcharts={Highcharts} options={options} />
		</div>
	);
};
