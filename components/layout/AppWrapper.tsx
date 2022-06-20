import type { FunctionComponent, ReactNode } from 'react';

import { Aside } from '@/components/layout/Aside';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export const AppWrapper: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className="grid min-h-[100vh] w-[100vw] grid-cols-[160px,1fr]">
			<Aside />
			<div className="relative h-full w-full">
				<Header />
				{children}
				<div className="absolute bottom-0 left-0 w-full">
					<Footer />
				</div>
			</div>
		</div>
	);
};
