import { Aside } from '@/components/layout/Aside';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FunctionComponent, ReactNode } from 'react';

export const AppWrapper: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className="grid grid-cols-[160px,1fr] min-h-[100vh] w-[100vw]">
			<Aside />
			<div className="w-full h-full relative">
				<Header />
				{children}
				<div className="absolute bottom-0 left-0 w-full">
					<Footer />
				</div>
			</div>
		</div>
	);
};
