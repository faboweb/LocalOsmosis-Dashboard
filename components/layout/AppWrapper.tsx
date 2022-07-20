// keep all layout related code here, just use pixels because it's the perks of tailwind + jit
import type { FunctionComponent, ReactNode } from 'react';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Nav } from '@/components/layout/Nav';
import { useInitializeApp } from '@/hooks/common/useInitializeApp';

export const AppWrapper: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
	useInitializeApp();
	return (
		// <div className="grid min-h-[100vh] w-[100vw] grid-cols-[160px,1fr]">
		<div className="bg-default grid min-h-[100vh] w-[100vw]">
			<div className="relative grid lg:grid-rows-[120px,160px,1fr,80px] md:grid-rows-[120px,120px,1fr,80px]">
				<Header />
				<Nav />
				<div className="min-h-[calc(100vh-160px)] w-full">{children}</div>
				<div className="absolute bottom-0 left-0 w-full">
					<Footer />
				</div>
			</div>
		</div>
	);
};
