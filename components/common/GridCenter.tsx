import { FunctionComponent, ReactNode } from 'react';

import cn from 'clsx';

export const GridCenter: FunctionComponent<{ children: ReactNode; className?: string }> = ({ children, className }) => {
	return (
		<div className={cn('w-full h-full grid grid-cols-[1fr,max-content,1fr]', className)}>
			<div />
			<div className="grid h-full w-full grid-rows-[1fr,max-content,1fr]">
				<div />
				{children}
				<div />
			</div>
			<div />
		</div>
	);
};
