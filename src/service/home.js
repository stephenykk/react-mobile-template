const getCarousel = async (pramas = {}) => {
	const url = $globalRequestUrl({
		url: '/getCarousel',
	});
	return await $globalRequest(url, pramas, { method: 'GET' })
		.then((res) => [res.data, null])
		.catch((err) => [null, err]);
};

const getBoutiqueList = async (pramas = {}) => {
	const url = $globalRequestUrl({
		url: '/boutiqueGoods',
	});
	return await $globalRequest(url, pramas, { method: 'GET' })
		.then((res) => [res.data, null])
		.catch((err) => [null, err]);
};

const getRecommendList = async (pramas = {}) => {
	const url = $globalRequestUrl({
		url: '/recommendGoods',
	});
	return await $globalRequest(url, pramas, { method: 'GET' }).then((res) => [res.data, null])
		.catch((err) => [null, err]);
};

export { getCarousel, getBoutiqueList, getRecommendList };
