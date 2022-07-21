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
		if (!router.isReady) return [];
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
	}, [router.asPath, router.isReady]);

	return (
		<nav className="my-auto px-5 lg:mx-auto lg:px-0 md:px-20 sm:px-10">
			{paths.length > 1 && (
				<div className="flex h-full w-full flex-wrap items-center gap-1 lg:w-lg md:gap-4">
					{paths.map((path, index) => (
						<Fragment key={path.route}>
							{index !== paths.length - 1 ? (
								<Link key={path.route} href={path.route}>
									<a className="hoverEff">
										<p className="text-[14px] text-accent md:text-[18px]">{path.label}</p>
									</a>
								</Link>
							) : (
								<h6 className="text-[14px] text-white.6 md:text-[18px]">{path.label}</h6>
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
