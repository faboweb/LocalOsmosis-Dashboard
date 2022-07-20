import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';

import { AppWrapper } from '@/components/layout/AppWrapper';
import { store } from '@/store/store';
import '@/styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<Provider store={store}>
			<AppWrapper>
				<Component {...pageProps} />
			</AppWrapper>
		</Provider>
	);
};

export default MyApp;
