import type { AppProps } from 'next/app';

import 'react-toastify/dist/ReactToastify.css';

import { AppWrapper } from '@/components/layout';
import { StoreProvider } from '@/store/store';
import '@/styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<StoreProvider>
			<AppWrapper>
				<Component {...pageProps} />
			</AppWrapper>
		</StoreProvider>
	);
};

export default MyApp;
