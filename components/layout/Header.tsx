import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';

import cn from 'clsx';

import { Img } from '@/components/common';

export const Header: FunctionComponent = () => {
	return (
		<header className="px-5 lg:mx-auto lg:px-0 md:px-20 sm:px-10">
			<div className="flex h-full w-full items-center justify-between lg:w-lg">
				<figure>
					<Img className="h-12 w-12 md:h-16 md:w-16" src="/icons/composable/xcvm.svg" alt="xcvm" />
				</figure>
				<Menu />
			</div>
		</header>
	);
};

const Menu: FunctionComponent = () => {
	const router = useRouter();
	const path = router.asPath;
	return (
		<nav>
			<ul className="grid auto-cols-auto grid-flow-col gap-3 lg:gap-12 md:gap-6">
				<li>
					<MenuButton selected={path === '/' || path === ''} text={'Overview'} route={'/'} />
				</li>
				<li>
					<MenuButton selected={path.startsWith('/relayers')} text={'Relayers'} route={'/relayers'} />
				</li>
			</ul>
		</nav>
	);
};

const MenuButton: FunctionComponent<{ text: string; route: string; selected: boolean }> = ({
	text,
	route,
	selected,
}) => {
	return (
		<Link href={route}>
			<button className={cn('px-5 md:px-8 py-3 md:py-4 group')}>
				<h6
					className={cn(
						'text-[14px] md:text-[18px]',
						selected ? '' : 'text-white.6 group-hover:text-white transition-all duration-200'
					)}>
					{text}
				</h6>
			</button>
		</Link>
	);
};
