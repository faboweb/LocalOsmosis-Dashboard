import { FunctionComponent } from 'react';

import { ChainStatusDisplay } from '@/components/common/ChainStatusDisplay';
import { useAppSelector } from '@/hooks/store';
import { selectChainStatuses } from '@/store/features/chain/chainDataSlice';

export const Header: FunctionComponent = () => {
	const chainStatuses = useAppSelector(selectChainStatuses);
	return (
		<header className="flex h-full w-full items-center justify-end bg-gray-600 py-2 px-4">
			<ul className="flex items-center justify-between gap-3">
				{chainStatuses.map(chainStatus => (
					<li className="w-full" key={chainStatus.name}>
						<ChainStatusDisplay chainStatus={chainStatus} />
					</li>
				))}
			</ul>
		</header>
	);
};
