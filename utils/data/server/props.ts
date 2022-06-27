import { GetServerSidePropsContext } from 'next';

import { getChainStatuses } from '@/utils/data/server/chain-status';

export async function getBaseServerSideProps(props: GetServerSidePropsContext) {
	//	consider chain availability to be fresh for 20 seconds, refetch availability in 60 seconds if refresh
	props.res.setHeader('Cache-Control', 'public, s-maxage=20, stale-while-revalidate=60');
	const chainStatuses = await getChainStatuses();
	return {
		props: {
			chainStatuses,
		},
	};
}
