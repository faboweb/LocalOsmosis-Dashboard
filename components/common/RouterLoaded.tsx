import { useRouter } from 'next/router';
import { FunctionComponent, ReactNode } from 'react';

export const RouterLoaded: FunctionComponent<{ fallback?: ReactNode; children: ReactNode }> = ({
	children,
	fallback,
}) => {
	const router = useRouter();
	return <>{router.isReady ? children : fallback}</>;
};
