import React from "react"

const routers = [
    {
        path: "/my",
        element: $globalLazy(React.lazy(() => import("@/views/my/index"))),
        meta: {
            title: "我的",
            isKeepAlive: true
        }
    }
];

export default $globalKeepRouter(routers)
