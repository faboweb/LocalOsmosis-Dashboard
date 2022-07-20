import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';

import cn from 'clsx';

export const Header: FunctionComponent = () => {
	return (
		<header className="px-20 lg:mx-auto lg:px-0">
			<div className="flex h-full w-full items-center justify-between lg:w-lg">
				<figure>
					<Image src="/icons/composable/xcvm.svg" alt="xcvm" width={64} height={64} />
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
			<ul className="grid auto-cols-auto grid-flow-col gap-6 lg:gap-12">
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
			<button className={cn('px-8 py-4 group')}>
				<h6 className={cn(selected ? '' : 'text-white.6 group-hover:text-white transition-all duration-200')}>
					{text}
				</h6>
			</button>
		</Link>
	);
};
