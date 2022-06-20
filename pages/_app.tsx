import '@/styles/globals.scss';

import type { AppProps } from 'next/app';
// TODO : fix the tsconfig or find a way s.t. you don't have to specify the index file in the above import
import { SWRConfig } from 'swr';

import { AppWrapper } from '@/components/layout/AppWrapper';
import { swrConfig } from '@/settings/index';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SWRConfig value={swrConfig.use('default')}>
			<AppWrapper>
				<Component {...pageProps} />
			</AppWrapper>
		</SWRConfig>
	);
}

export default MyApp;
