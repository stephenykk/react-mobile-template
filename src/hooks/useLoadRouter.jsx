
// * 导入所有router
const metaRouters = import.meta.glob("../router/*.jsx", { eager: true })

// * 处理路由
const routerArray = [];
let uniPath = []
Object.keys(metaRouters).forEach(item => {
    Object.keys(metaRouters[item]).forEach((key) => {
        Object.keys(metaRouters[item][key]).forEach((it) => {
            const { path = '' } = metaRouters[item][key][it]
            uniPath.includes(path) ? console.error(`路由path存在重复：${path}`) : uniPath.push(path)
        });
        routerArray.push(...metaRouters[item][key])
    });
});

const rootRouter = [
    {
        path: "/",
        element: <Navigate to="/login" />
    },
    ...routerArray,
    {
        path: "*",
        element: <Navigate to="/404" />
    }
];

const $globalRouter = () => {
    const routes = useRoutes(rootRouter)
    return routes
};

export {
    $globalRouter,
    rootRouter
} 
