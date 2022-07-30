import { FunctionComponent } from 'react';

import { useStore } from '@/hooks/common/useStore';

export const Contracts: FunctionComponent = () => {
	const {
		state: { contracts },
	} = useStore();
	return (
		<div className="flex h-full w-full items-center justify-center overflow-scroll flex flex-col max-h-50">
			<p>Contracts Area</p>
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
