const getGoodsNum = async (pramas = {}) => {
	const url = $globalRequestUrl({
		url: '/getGoodsNum',
	});
	return await $globalRequest(url, pramas, { method: 'GET' })
		.then((res) => [res.data, null])
		.catch((err) => [null, err]);
};
const getGoodsDetal = async (pramas = {}) => {
	const url = $globalRequestUrl({
		url: '/getGoodsdetal',
	});
	return await $globalRequest(url, pramas, { method: 'GET' })
		.then((res) => [res.data, null])
		.catch((err) => [null, err]);
};
const getLanguage = async (pramas = {}) => {
	const url = $globalRequestUrl({
		url: '/getLanguage',
	});
	return await $globalRequest(url, pramas, { method: 'GET' })
		.then((res) => [res.data, null])
		.catch((err) => [null, err]);
};

export { getGoodsNum, getGoodsDetal, getLanguage };
