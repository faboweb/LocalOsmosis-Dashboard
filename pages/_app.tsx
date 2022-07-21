import type { AppProps } from 'next/app';
import { useEffect } from 'react';

import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import { AppWrapper } from '@/components/layout';
import { store } from '@/store/store';
import '@/styles/globals.scss';
import { initLocalStorage } from '@/utils/data/localStorage';

const MyApp = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		initLocalStorage();
	}, []);
	return (
		<Provider store={store}>
			<AppWrapper>
				<Component {...pageProps} />
			</AppWrapper>
		</Provider>
	);
};

export default MyApp;
