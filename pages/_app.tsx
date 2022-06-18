import type { AppProps } from 'next/app';
import '../styles/globals.scss';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout';
import { Aside } from '@/components/layout/Aside';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<div className="grid grid-cols-[160px,1fr] min-h-[100vh] w-[100vw]">
			<Aside />
			<div className="w-full h-full relative">
				<Header />
				<Component {...pageProps} />
				<div className="absolute bottom-0 left-0 w-full">
					<Footer />
				</div>
			</div>
		</div>
	);
}

export default MyApp;
