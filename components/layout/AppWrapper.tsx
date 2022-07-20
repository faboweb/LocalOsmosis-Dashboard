// keep all layout related code here, just use pixels because it's the perks of tailwind + jit
import type { FunctionComponent, ReactNode } from 'react';

import { Header } from '@/components/layout/Header';
import { Nav } from '@/components/layout/Nav';
import { useInitializeApp } from '@/hooks/common/useInitializeApp';

export const AppWrapper: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
	useInitializeApp();
	return (
		// <div className="grid min-h-[100vh] w-[100vw] grid-cols-[160px,1fr]">
		<div className="bg-default grid min-h-[100vh] w-[100vw]">
			<div className="relative grid lg:grid-rows-[120px,160px,1fr] md:grid-rows-[120px,120px,1fr]">
				<Header />
				<Nav />
				<div className="w-full lg:min-h-[calc(100vh-280px)] md:min-h-[calc(100vh-240px)]">{children}</div>
			</div>
		</div>
	);
};
