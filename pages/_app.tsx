import type { AppProps } from 'next/app';
import '@/styles/globals.scss';
import { AppWrapper } from '@/components/layout/AppWrapper';
import { swrConfig } from '@/settings/index';
import { SWRConfig } from 'swr';

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
