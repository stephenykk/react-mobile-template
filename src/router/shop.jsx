import React from "react"

const routers = [
    {
        path: "/shop",
        element: $globalLazy(React.lazy(() => import("@/views/shop/index"))),
        meta: {
            title: "我的",
            isKeepAlive: true
        }
    }
];

export default $globalKeepRouter(routers)
