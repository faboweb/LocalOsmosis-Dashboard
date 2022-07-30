import type { AppProps } from 'next/app';

import 'react-toastify/dist/ReactToastify.css';

import { AppWrapper } from '@/components/layout';
import '@/styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<AppWrapper>
			<Component {...pageProps} />
		</AppWrapper>
	);
};

export default MyApp;
