// keep all layout related code here, just use pixels because it's the perks of tailwind + jit
import type { FunctionComponent, ReactNode } from 'react';

import { Flip, ToastContainer } from 'react-toastify';

import { Header } from '@/components/layout/Header';
import { useInitializeApp } from '@/hooks/data/useInitializeApp';

export const AppWrapper: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
	useInitializeApp();
	return (
		<div className="min-h-[100vh] w-[100vw]">
			<div className="relative grid grid-rows-[120px,1fr]">
				<Header />
				<div className="min-h-[calc(100vh-120px)] w-full">{children}</div>
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
