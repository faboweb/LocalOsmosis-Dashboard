export const parseEvent = (event: any) => {
	const ret = {} as Record<string, Record<string, any>>;
	const events = event.response?.events as Record<string, any>;
	if (!events) return [];
	Object.keys(events).forEach(key => {
		const [realKey, property] = key.split('.');
		if (!ret[realKey])
			ret[realKey] = {
				[property]: events[key],
			};
		else {
			ret[realKey][property] = events[key];
		}
	});
	return {
		ret,
		height:
			event.response.data.value.header?.height ??
			event.response.data.value.block?.last_commit?.height ??
			event.response.data.value.TxResult?.height,
	};
};
