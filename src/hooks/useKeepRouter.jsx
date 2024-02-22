import { Suspense } from "react";
import KeepAlive from "react-activation"
const { MODE } = import.meta.env

// 路由懒加载
const $globalLazy = (Comp) => {
    return (
        <Suspense>
            <Comp />
        </Suspense>
    );
};

// 路由配置缓存
const $globalKeepRouter = (routers) => {
    routers.forEach(item => {
        const { meta = {}, path = '' } = item
        const { isKeepAlive } = meta
        const uniqueId = `${MODE}_${path}`
        isKeepAlive && path && (item.element = <KeepAlive name={uniqueId} cacheKey={uniqueId}>{item.element}</KeepAlive>)
    });

    return routers
}

export {
    $globalLazy,
    $globalKeepRouter
}
