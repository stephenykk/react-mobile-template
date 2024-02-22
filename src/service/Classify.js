const getClassifyGoods = async (pramas = {}) => {
	const url = $globalRequestUrl({
		url: '/classifyGoods',
	});
	return await $globalRequest(url, pramas, { method: 'POST' })
		.then((res) => [res.data, null])
		.catch((err) => [null, err]);
};
const getClassify = async (pramas = {}) => {
	const url = $globalRequestUrl({
		url: '/getClassify',
	});
	return await $globalRequest(url, pramas, { method: 'GET' })
		.then((res) => [res.data, null])
		.catch((err) => [null, err]);
};

export { getClassifyGoods, getClassify };
