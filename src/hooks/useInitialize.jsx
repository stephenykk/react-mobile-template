import { useEffect } from 'react'
import { HashRouter } from "react-router-dom";
import { AliveScope } from 'react-activation';
import { Provider } from 'react-redux';
import 'amfe-flexible'; // 导入适配
import '@/locales/index'; // 导入国际化
import '@/styles/common.less'; // 导入公共样式
import { initFn } from '@/hooks/useCommon'

const $globalReady = () => {
	// 处理url
	const handleLoadUrl = () => {
		const url = window.location.href;
		const match = url.match(/#([^?]+)/);
		const path = match ? match[1] : url.substring(url.indexOf('#') + 2);
		return path;
	};

	useEffect(() => {
		const url = handleLoadUrl()
		if (!['/', '/login'].includes(url)) {
			initFn()
		}
	}, [])
	return (
		<Provider store={$globalRedux}>
			<HashRouter>
				<AliveScope>
					<$globalGuard>
						<$globalRouter />
					</$globalGuard>
				</AliveScope>
			</HashRouter>
		</Provider>
	)
};

export { $globalReady };
