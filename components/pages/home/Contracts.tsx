import { FunctionComponent, useEffect } from 'react';

import { useStore } from '@/hooks/common/useStore';
import api from '@/utils/rpc';

export const Contracts: FunctionComponent = () => {
	const {
		state: { contracts },
		pushContracts,
	} = useStore();

	const update = async () => {
		const _contracts = await (await api).runningContracts();
		pushContracts(_contracts);
	};

	useEffect(() => {
		update();
	}, []);
	return (
		<div className="flex h-full w-full items-center justify-center overflow-scroll flex flex-col max-h-50">
			<p>Contracts Area</p>
			<button onClick={() => update()}>Update</button>
			<ul>
				{contracts.map(contract => (
					<li key={contract.address} className="flex flex-col">
						<div>{contract.label}</div>
						<div>
							<div>{contract.address}</div>
							<div>{contract.codeId}</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};
