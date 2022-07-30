import { FunctionComponent } from 'react';

import { Img } from '@/components/common';

export const Header: FunctionComponent = () => {
	return (
		<header className="px-10">
			<div className="flex h-full w-full items-center justify-between">
				<figure>
					<Img className="h-12" src="/icons/osmosis/osmosis-logo.svg" alt="xcvm" />
				</figure>
			</div>
		</header>
	);
};
