import React from "react";

const routers = [
    
    {
        path: "/classify",
        element: $globalLazy(React.lazy(() => import("@/views/classify/index"))),
        meta: {
            title: "分类",
            isKeepAlive: true
        }
    }
];

export default $globalKeepRouter(routers);
