import { useCallback, useState } from 'react';

import isEmpty from 'lodash/isEmpty';

interface Pagination<T> {
	current: number;
	total: number;
	values: T[];
}
export const usePagination = <T>(pageSize: number) => {
	const [state, setState] = useState<Pagination<T>>({ current: 0, total: 0, values: [] });

	const setPage = useCallback((page: number) => {
		setState(prevState => {
			if (page < 0 || page >= prevState.total) return prevState;
			return {
				...prevState,
				current: page,
			};
		});
	}, []);

	const setValues = useCallback(
		(values: T[]) => {
			setState(prevState => ({
				...prevState,
				values,
				total: Math.ceil(values.length / pageSize),
			}));
		},
		[pageSize]
	);

	return {
		values: isEmpty(state.values) ? [] : state.values.slice(state.current * pageSize, (state.current + 1) * pageSize),
		current: state.current,
		total: state.total,
		setPage,
		setValues,
	};
};
