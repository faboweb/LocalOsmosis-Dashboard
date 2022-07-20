import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, FunctionComponent, useMemo } from 'react';

import capitalize from 'lodash/capitalize';

import { ArrowHeadDown } from '@/components/assets/ArrowHeadDown';

interface Path {
	route: string;
	label: string;
}
export const Nav: FunctionComponent = () => {
	const router = useRouter();

	const paths = useMemo(() => {
		const routes = router.asPath.split('/').filter(path => path !== '');
		const ret: Path[] = [];
		routes.forEach((route, index) => {
			ret.push({
				route: `/${routes.slice(0, index).join('/')}${index !== 0 ? '/' : ''}${route}`,
				label: capitalize(route.replace(/_/g, ' ')),
			});
			if (index === routes.length - 1) {
				ret[ret.length - 1].label = 'Current';
			}
		});
		return ret;
	}, [router.asPath]);

	return (
		<nav className="my-auto px-20 lg:mx-auto lg:px-0">
			{paths.length > 1 && (
				<div className="grid h-full w-full auto-cols-max grid-flow-col gap-4 lg:w-lg">
					{paths.map((path, index) => (
						<Fragment key={path.route}>
							{index !== paths.length - 1 ? (
								<Link key={path.route} href={path.route}>
									<a className="hoverEff">
										<h6 className="text-accent">{path.label}</h6>
									</a>
								</Link>
							) : (
								<h6>{path.label}</h6>
							)}
							{index !== paths.length - 1 && (
								<ArrowHeadDown fill={'#ffffff'} fillOpacity={0.6} className="rotate-[270deg]" />
							)}
						</Fragment>
					))}
				</div>
			)}
		</nav>
	);
};
