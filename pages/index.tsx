import type { NextPage } from 'next';
import { GetServerSidePropsContext } from 'next';

import { useInitializeApp } from '@/hooks/common/useInitializeApp';
import { ServerSideProps } from '@/utils/data/server';
import { getBaseServerSideProps } from '@/utils/data/server/props';

const Home: NextPage<ServerSideProps> = (serverProps: ServerSideProps) => {
	useInitializeApp(serverProps);
	return (
		<div className="flex h-full w-full items-center justify-center bg-gray-800">
			<h1>Home area</h1>
		</div>
	);
};

export default Home;

export async function getServerSideProps(props: GetServerSidePropsContext) {
	return getBaseServerSideProps(props);
}
