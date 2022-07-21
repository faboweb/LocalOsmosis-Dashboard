import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useGetQuery = (query: string) => {
	const router = useRouter();
	const [ret, setRet] = useState<string>('');
	useEffect(() => {
		if (!router.isReady) return;
		setRet(`${router.query[query]}`);
	}, [router.isReady, query]);
	return ret;
};
