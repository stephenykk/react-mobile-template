import React from "react"

const routers = [
    
    {
        path: "/home",
        element: $globalLazy(React.lazy(() => import("@/views/home/index"))),
        meta: {
            title: "首页",
            isKeepAlive: true
        }
    }
];

export default $globalKeepRouter(routers)
