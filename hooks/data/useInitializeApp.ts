import { useEffect } from 'react';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

import { useStore } from '@/hooks/common/useStore';
import connectors from '@/utils/rpc';

dayjs.extend(relativeTime);
dayjs.extend(duration);

async function initializeApp() {
	console.log('initializing app');
	const connector = await connectors;
	console.log(connector);
}

//  initialize app will be called twice in development due to react strict mode
export function useInitializeApp() {
	const store = useStore();
	useEffect(() => {
		initializeApp();
	}, []);
}
