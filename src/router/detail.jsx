import React from "react"

const routers = [
    {
        path: "/detail",
        element: $globalLazy(React.lazy(() => import("@/views/detail/index"))),
        meta: {
            title: "详情",
            isKeepAlive: true
        }
    }
];

export default $globalKeepRouter(routers)
