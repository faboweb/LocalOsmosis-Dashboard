import * as React from 'react';

export function useRunOnHydrate(fn: () => void) {
	React.useEffect(() => {
		fn();
	}, []);
}
