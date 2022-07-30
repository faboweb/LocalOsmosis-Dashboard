import { FunctionComponent } from 'react';

import { useStore } from '@/hooks/common/useStore';

export const Events: FunctionComponent = () => {
	const {
		state: { events },
	} = useStore();
	console.log(events);
	return (
		<div className="flex h-full w-full items-center justify-center">
			<p>Events Area</p>
		</div>
	);
};
