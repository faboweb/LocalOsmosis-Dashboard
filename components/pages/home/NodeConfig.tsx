import { FunctionComponent } from 'react';

import copy from 'copy-to-clipboard';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';

import { Loader } from '@/components/common/Loader';
import { useStore } from '@/hooks/common/useStore';
import { NodeConfig as NodeConfigType } from '@/store/store';

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
		<div className="w-full h-full flex flex-col gap-3 justify-around">
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
				className="text-center text-[16px] leading-none tracking-tighter truncate hover:text-accent cursor-pointer">
				{content.toString()}
			</p>
		</div>
	);
};
