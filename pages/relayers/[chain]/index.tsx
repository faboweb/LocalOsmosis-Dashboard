import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Chain: NextPage = () => {
	const router = useRouter();
	return (
		<div className="wh-full flex flex-col items-center">
			<h3 className="mt-10 md:mt-0">Select Category</h3>
			<Link href={`/relayers/${router.query?.chain}/operator`}>
				<a className="hoverEff-txt mt-10 p-4 text-2xl">Operator</a>
			</Link>
		</div>
	);
};

export default Chain;
