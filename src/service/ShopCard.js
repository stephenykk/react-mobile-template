const getCard = async (pramas = {}) => {
	const url = $globalRequestUrl({
		url: '/getCard',
	});
	return await $globalRequest(url, pramas, { method: 'GET' })
		.then((res) => [res.data, null])
		.catch((err) => [null, err]);
};

const delCard = async (pramas = {}) => {
	const url = $globalRequestUrl({
		url: '/delCard',
	});
	return await $globalRequest(url, pramas, { method: 'POST' })
		.then((res) => [res.data, null])
		.catch((err) => [null, err]);
};

const changeGoods = async (pramas = {}) => {
	const url = $globalRequestUrl({
		url: '/changeGoods',
	});
	return await $globalRequest(url, pramas, { method: 'POST' })
		.then((res) => [res.data, null])
		.catch((err) => [null, err]);
};

export { getCard, delCard, changeGoods };
