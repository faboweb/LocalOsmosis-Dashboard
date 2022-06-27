import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';
// TODO : fix the tsconfig or find a way s.t. you don't have to specify the index file in the above import
import { SWRConfig } from 'swr';

import { store } from '@/store/store';

import { AppWrapper } from '@/components/layout/AppWrapper';

import { swrConfig } from '@/settings/index';

import '@/styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<SWRConfig value={swrConfig.use('default')}>
				<AppWrapper>
					<Component {...pageProps} />
				</AppWrapper>
			</SWRConfig>
		</Provider>
	);
}

export default MyApp;
