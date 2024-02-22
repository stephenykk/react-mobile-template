import React from "react"

const routers = [
    {
        path: "/login",
        element: $globalLazy(React.lazy(() => import("@/views/login"))),
        meta: {
            title: "404页面"
        }
    },
    {
        path: "/404",
        element: $globalLazy(React.lazy(() => import("@/views/404"))),
        meta: {
            title: "404页面"
        }
    }
];

export default $globalKeepRouter(routers)
