import dayjs from 'dayjs';

export const refineNewBlockData = (event: any) => {
	const resp = event?.response?.data;
	if (resp)
		return {
			height: resp.value.block.last_commit?.height,
			time: dayjs(resp.value.block.header?.time).valueOf(),
		};
	else {
		const data = event?.block.header;
		return {
			height: data.height,
			time: dayjs(data.time).valueOf(),
		};
	}
};
