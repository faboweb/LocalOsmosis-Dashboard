import type { NextPage } from 'next';
import { GetServerSidePropsContext } from 'next';

import { getChainStatuses } from '@/utils/server';

const Home: NextPage = props => {
	console.log(props);
	return (
		<div className="flex h-full w-full items-center justify-center">
			<h1>Home area</h1>
		</div>
	);
};

export default Home;

// TODO : refactor to different location
export async function getServerSideProps({ res }: GetServerSidePropsContext) {
	//	consider chain availability to be fresh for 20 seconds, refetch availability in 60 seconds if refresh
	res.setHeader('Cache-Control', 'public, s-maxage=20, stale-while-revalidate=60');
	const chainStatuses = await getChainStatuses();
	return {
		props: {
			chainStatuses,
		},
	};
}
