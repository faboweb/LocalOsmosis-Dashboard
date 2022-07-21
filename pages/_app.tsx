import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import { AppWrapper } from '@/components/layout';
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
