import { FunctionComponent } from 'react';

import { SvgProps } from '@/components/assets/types';

export const ArrowHeadDown: FunctionComponent<SvgProps> = ({ fill, stroke, className, fillOpacity }) => {
	return (
		<svg
			className={className}
			fillOpacity={fillOpacity}
			width={24}
			height={24}
			viewBox="0 0 24 24"
			fill={fill}
			stroke={stroke}
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M16.293 8.43951L12 12.7325L7.70697 8.43951L6.29297 9.85351L12 15.5605L17.707 9.85351L16.293 8.43951Z"
				fill="inherit"
				stroke="inherit"
			/>
		</svg>
	);
};
