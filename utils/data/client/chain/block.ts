import dayjs from 'dayjs';

export const refineNewBlockData = (event: any) => {
	const resp = event.response.data;
	return {
		height: resp.value.block.last_commit?.height,
		hash: resp.value.block.header.block_id?.hash,
		time: dayjs(resp.value.block.header?.time).unix(),
	};
};
