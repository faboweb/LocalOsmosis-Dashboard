// keep all layout related code here, just use pixels because it's the perks of tailwind + jit
import type { FunctionComponent, ReactNode } from 'react';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export const AppWrapper: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
	return (
		// <div className="grid min-h-[100vh] w-[100vw] grid-cols-[160px,1fr]">
		<div className="grid min-h-[100vh] w-[100vw]">
			<div className="relative grid grid-rows-[80px,1fr,80px]">
				<Header />
				<div className="min-h-[calc(100vh-160px)] w-full">{children}</div>
				<div className="absolute bottom-0 left-0 w-full">
					<Footer />
				</div>
			</div>
		</div>
	);
};
