import { FunctionComponent, useState } from 'react';

import exportFromJSON from 'export-from-json';

import { Img } from '@/components/common';
import { DialogWrapper } from '@/components/common/DialogWrapper';
import { useStore } from '@/hooks/common/useStore';

export const Header: FunctionComponent = () => {
	return (
		<>
			<header className="px-5 absolute z-50 bottom-[30px] right-[30px]">
				<figure className="opacity-25">
					<Img className="h-8" src="/icons/osmosis/osmosis-logo.svg" alt="xcvm" />
				</figure>
			</header>
			<Menu />
		</>
	);
};

const Menu: FunctionComponent = () => {
	const [open, setOpen] = useState(false);
	const { state } = useStore();
	return (
		<>
			<DialogWrapper isOpen={open} setIsOpen={setOpen} sizeClass="w-[50vw] max-w-[300px] h-[50vh] max-h-[600px]">
				<ul className="w-full h-full flex flex-col items-center py-4">
					<li>
						<button
							onClick={() => {
								exportFromJSON({
									data: state,
									fileName: 'state',
									exportType: exportFromJSON.types.json,
								});
							}}
							className="flex items-center gap-3 px-5 py-2 border border-enabledGold border-opacity-50 rounded-lg hover:border-accent cursor-pointer group transition-all duration-200">
							<img
								className="h-5 w-5 opacity-90 group-hover:opacity-100 filter-white"
								src="/icons/generic/export.svg"
							/>
							<p className="font-mono text-[16px] opacity-90 group-hover:opacity-100 transition-all duration-200">
								Export App State
							</p>
						</button>
					</li>
				</ul>
			</DialogWrapper>
			<figure className="backdrop-blur-sm fixed z-60 top-[10px] right-[10px]">
				<button
					onClick={() => setOpen(v => !v)}
					className="p-2 border border-enabledGold rounded-lg hover:invert transition-all duration-200">
					<img className="filter-white w-7 h-7" src="/icons/generic/hamburger.svg" />
				</button>
			</figure>
		</>
	);
};
