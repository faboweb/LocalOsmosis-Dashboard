// keep all layout related code here, just use pixels because it's the perks of tailwind + jit
import type { FunctionComponent, ReactNode } from 'react';

import { Flip, ToastContainer } from 'react-toastify';

import { Header } from '@/components/layout/Header';
import { Nav } from '@/components/layout/Nav';
import { useInitializeApp } from '@/hooks/data/useInitializeApp';

export const AppWrapper: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
	useInitializeApp();
	return (
		// <div className="grid min-h-[100vh] w-[100vw] grid-cols-[160px,1fr]">
		<div className="min-h-[100vh] w-[100vw]">
			<div className="relative grid grid-rows-[100px,40px,1fr] lg:grid-rows-[120px,160px,1fr] md:grid-rows-[120px,120px,1fr]">
				<Header />
				<Nav />
				<div className="w-full lg:min-h-[calc(100vh-280px)] md:min-h-[calc(100vh-240px)]">{children}</div>
			</div>
			<ToastContainer
				position="top-center"
				autoClose={2000}
				newestOnTop
				hideProgressBar
				draggable={false}
				closeOnClick
				pauseOnHover
				pauseOnFocusLoss={false}
				theme="dark"
				transition={Flip}
			/>
			<div className="bg-default fixed top-0 left-0 z-[-1] h-[200vw] w-[200vw]" />
		</div>
	);
};
