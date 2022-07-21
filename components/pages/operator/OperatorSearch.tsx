import { FunctionComponent } from 'react';

export const OperatorSearch: FunctionComponent = () => {
	// TODO : use react-hook-form to handle form validation
	return (
		<section>
			<div className="relative flex h-[72px] w-full grow items-center gap-4 rounded-2xl border-2 border-white.16 p-6">
				<img src="/icons/generic/search.svg" width={24} height={24} />
				<input
					type="text"
					onKeyDown={e => {
						if (e.key === 'Enter') {
							alert('TODO');
						}
					}}
					placeholder="Search by address, block height or transaction hash"
					className="spacing-[0.1px] placeholder:text-text-white.6 w-full bg-transparent text-[18px] leading-[24px]"
				/>
			</div>
		</section>
	);
};
