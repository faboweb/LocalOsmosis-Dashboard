import { useEffect, useState } from 'react';

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
		series: [
			{
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
	};

	return (
		<div className="w-[80vw] mx-auto">
			<DialogWrapper isOpen={!!openBlock} setIsOpen={setOpenBlock}>
				{openBlock && <DisplayJson data={openBlock} />}
			</DialogWrapper>
			<HighchartsReact containerProps={{ style: { height: '100%' } }} highcharts={Highcharts} options={options} />
		</div>
	);
};
