import { FunctionComponent, ReactNode } from 'react';

import cn from 'clsx';

export const Card: FunctionComponent<{ children: ReactNode; className?: string }> = ({ children, className }) => {
	return (
		<section
			className={cn('w-full h-full rounded-2xl hover:bg-enabledGold hover:bg-none bg-superfluid p-[1px]', className)}>
			<div className="h-full w-full rounded-2xlinset bg-card p-2">{children}</div>
		</section>
	);
};
