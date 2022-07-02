import * as React from 'react';

import { ChainStatusDisplay } from '@/components/common/ChainStatusDisplay';
import { useAppSelector } from '@/hooks/store';
import { selectChainStatuses } from '@/store/features/chain/chainDataSlice';

export const Header: React.FunctionComponent = () => {
	return (
		<header className="relative z-10 flex h-full w-full justify-end border-b border-primary border-opacity-25 bg-bg py-2 px-4">
			<StatusGrid />
		</header>
	);
};

const StatusGrid = () => {
	const chainStatuses = useAppSelector(selectChainStatuses);
	const ref = React.useRef<HTMLDivElement>(null);
	const [hovering, setHovering] = React.useState(false);
	React.useEffect(() => {
		if (!ref.current || hovering) return;
		ref.current.scrollTop = 0;
	}, [hovering]);
	return (
		<div className="absolute top-0 right-0 max-w-[300px] scroll-smooth border border-primary border-opacity-40 bg-bgBox p-2 transition-all hover:border-opacity-100 hover:py-5">
			<div
				onMouseEnter={() => setHovering(true)}
				onMouseLeave={() => setHovering(false)}
				ref={ref}
				className="group max-h-[62px] overflow-hidden transition-all scrollbar-hide hover:max-h-[600px] hover:overflow-scroll">
				<ul className="grid w-full auto-rows-auto grid-cols-5 gap-3 transition-all">
					{chainStatuses.map(chainStatus => (
						<li key={chainStatus.name}>
							<ChainStatusDisplay chainStatus={chainStatus} />
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
