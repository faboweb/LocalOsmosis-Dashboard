import { FunctionComponent } from 'react';

import { Img } from '@/components/common';

export const Header: FunctionComponent = () => {
	return (
		<header className="px-5 absolute z-50 bottom-[30px] right-[30px]">
			<figure className="opacity-25">
				<Img className="h-8" src="/icons/osmosis/osmosis-logo.svg" alt="xcvm" />
			</figure>
		</header>
	);
};
