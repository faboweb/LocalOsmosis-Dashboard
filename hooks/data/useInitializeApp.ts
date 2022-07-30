import { useEffect } from 'react';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.extend(duration);

async function initializeApp() {
	console.log('initializing app');
}

//  initialize app will be called twice in development due to react strict mode
export function useInitializeApp() {
	useEffect(() => {
		initializeApp();
	}, []);
}
