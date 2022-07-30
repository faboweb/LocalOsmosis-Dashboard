import { Img } from '@/components/common/Img';

export const Loader = () => {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<Img className="h-10 w-10 filter-white" src="/icons/generic/loading-spin.svg" />
		</div>
	);
};
