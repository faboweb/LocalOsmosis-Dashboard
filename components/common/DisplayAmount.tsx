import { FunctionComponent } from 'react';

import Big from 'big.js';

export const DisplayAmount: FunctionComponent<{ amount: string; denom: string; decimals: number }> = ({
	amount,
	denom,
	decimals,
}) => {
	return (
		<>
			{amount !== '0'
				? Big(amount)
						.div(10 ** decimals)
						.toFixed(decimals)
				: '0'}{' '}
			{denom}
		</>
	);
};
