const getAdderssList = async (pramas = {}) => {
	const url = $globalRequestUrl({
		url: '/getAddersslist',
	});
	return await $globalRequest(url, pramas, { method: 'GET' })
		.then((res) => [res.data, null])
		.catch((err) => [null, err]);
};
const getAddressEdit = async (pramas = {}) => {
	const url = $globalRequestUrl({
		url: '/getAddressedit',
	});
	return await $globalRequest(url, pramas, { method: 'POST' })
		.then((res) => [res.data, null])
		.catch((err) => [null, err]);
};

export { getAdderssList, getAddressEdit };
