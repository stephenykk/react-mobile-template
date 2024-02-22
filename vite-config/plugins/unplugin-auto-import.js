import autoImport from 'unplugin-auto-import/vite'; // 全局自动导入插件
const AutoImport = (viteEnv = {}) => {
	return autoImport({
		imports: [
			"react-router-dom",
			"react-i18next",
			{
				'@/hooks/useInitialize': ['$globalReady'], // 初始化
				'@/hooks/useLoadRouter': ['$globalRouter'], // 全局自动导入路由
				'@/hooks/useKeepRouter': ['$globalLazy', '$globalKeepRouter'], // 全局自动导入路由缓存
				'@/hooks/usePrompt': ['$globalGuard'], // 全局自动导入路由守卫
				'@/hooks/useService': ['$globalServicer'], // 全局自动加载请求模块
				'@/hooks/useFetch': ['$globalRequestUrl','$globalRequest'], // 全局自动导入请求模块
				'@/hooks/useRedux': ['$globalRedux', '$globalReduxAction'], // 全局自动导入redux
				'@/hooks/useCustomNavigate': ['$globalNavigate'] // 全局自动导入重写路由跳转
			},
		],
	});
};

export { AutoImport };
