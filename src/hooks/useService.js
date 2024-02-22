// * 导入所有router
const modServicer = import.meta.glob('../service/**/*.js', { eager: true });

// * 处理路由
const resServicer = {};
for (const [key, value] of Object.entries(modServicer)) {
	const moduleName = key.replace(/^\.\.\/(.*)\.\w+$/, '$1').split('/')[1];
	resServicer[moduleName] = {};
	for (const [childKey, childValue] of Object.entries(value)) {
		resServicer[moduleName][childKey] = childValue;
	}
}

const $globalServicer = (type) => {
	return resServicer[type];
};

export { $globalServicer };
