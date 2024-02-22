# React+antd-mobile+vite
 尚未实现同一页面缓存可无限跳转自身，并且加载新数据，返回又缓存跳转之前的页面数据的功能（vue项目已实现）
## 项目地址

<a href="http://www.react.lanlianjiu.xyz/#/login" target="_blank">react 项目演示</a><br/>

<a href="https://www.lanlianjiu.xyz/#/login" target="_blank">vue项目演示</a><br/>

<span>vue项目代码:<a href="https://gitee.com/674074365/vue3-vant3-h5" target="_blank">vue项目代码</a></span>

## 环境版本

```
npm-check-updates@16.14.12 (ncu -u)
nvm@1.1.11
node@20.0.0
npm@9.6.4

```

## 项目重要知识点

```html
1. 采用 React18 + vite + redux + react-redux + react-router-dom（v6）
2.可通过配置路由实现页面缓存效果（路由插件+react-activation插件组件构成） 3.
使用 unplugin-auto-import
插件实现自动导入库、方法、函数、自定义等,以$global为前缀作为全局自动导入
4.通过模块化配置vite插件，在vite-config/plugins文件夹下配置vite插件
5.全局方法、变量有：$globalReady、$globalRouter、$globalLazy、$globalKeepRouter
$globalGuard、$globalServicer、$globalRequestUrl、$globalRequest、$globalRedux
$globalReduxAction、$globalNavigate
```

## 项目安装

```
npm install 或 cnpm install

```

## 项目启动

```
npm run vite
```

## 项目打包

```
npm run build:dev
npm run build:prod
```

## 项目目录结构

```
|-- src
|    |-- api // api地址
|    |-- assets // 样式以及图片
|    |-- components // 公共组件
|    |-- hooks // 公用模块
|    |       |-- useCommon.js // 抽离公共函数
|    |       |-- useCustomNavigate.js // 全局自动导入路由跳转方法（针对跳转缓存页面）
|    |       |-- useFetch.js // 全局自动导入请求拼接等处理
|    |       |-- useInitialize.jsx // 全局自动导入初始化
|    |       |-- useKeepRouter.jsx // 全局自动导入路由缓存处理
|    |       |-- useLoadRouter.jsx // 全局自动导入加载路由模块
|    |       |-- usePrompt.jsx // 全局自动导入路由守卫
|    |       |-- useRedux.js // 全局自动导入redux
|    |       |-- useService.js // 全局自动导入请求模块
|    |-- locales // 多语言配置
|    |-- redux // redux
|    |-- router // 路由模块
|    |-- service // 请求模块
|    |-- styles // 公用样式
|    |-- views // 页面
|    |-- main.js // 入口jsx文件
|--vite-config  // vite配置
|     |--plugins // vite插件配置
|     |--index.js // vite处理配置
|--vite-env  // vite环境配置
|     |-- .env    // 本地环境配置
|     |-- .env.dev // 测试环境配置
|     |-- .env.prod // 生产环境配置
|
|-- .eslintrc.js // es配置
|-- babel.config.js // babel配置
|-- vite.config.js // 脚手架配置
```

```js
vite.config.js 配置说明

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { baseCfg, pluginCfg } from "./vite-config";
export default async ({ mode }) => {
	const { VITE_BASE_URL } = loadEnv(mode, process.cwd());
	return defineConfig({
		...baseCfg({ VITE_BASE_URL }),
		plugins: [react(), ...(await pluginCfg({ VITE_BASE_URL }))],
	});
};
```

```
    (3) 对于vite.config.js配置，通过在vite-config/plugins文件夹下建js文件，在index.js会自动加载，在index.js文件内也可配置vite的基本配置
    (4) 对于unplugin-auto-import.js的配置， 针对react-router-dom、react-i18next页面无需使用例如： import { useNavigate } from "react-router-dom";
       可以直接使用 const navigate = useNavigate();
    (5) 对于unplugin-auto-import.js的配置，针对对象内的配置自定义导入的，key为路径，值为数组的形式，
    数组内的名称必须要与路径配置的文件export {}导
       出的名称一致
    (6) 针对unplugin-auto-import.js的自定义配置导出名称建议都以：$global作前缀定义，以说明是通过插件全局自动导入，
    配置则在unplugin-auto-import.js文件内

```

## 项目路由原理

```
注意：本地调试时，在缓存页面进行刷新时可能会导致不触发路由通知初始化的情况。

路由大体分为两种：缓存页面、不缓存页面

1.缓存页面：通过路由配置+react-activation插件+自定义useCustomNavigate方法共同构成

2.配置不缓存组件：配置isKeepAlive为fasle或者不配置
```

```js
   {
        path: "/home",
        element: $globalLazy(React.lazy(() => import("@/views/home/index"))),
        meta: {
            title: "首页"
        }
    }
```

```
3.配置缓存路由：
   （1）只要在src/router 内的所有模块js文件内的isKeepAlive设置为true，则页面起缓存效果
```

```js
   {
        path: "/home",
        element: $globalLazy(React.lazy(() => import("@/views/home/index"))),
        meta: {
            title: "首页",
            isKeepAlive: true
        }
    }
```

```js
   （3）配置页面缓存,通过配置页面路由加插件进行缓存效果，同时跳转还需要使用自定义hooks方法useCustomNavigate进行跳转到缓存页面,其中customNavigate的使用方式与react-router-dom的const navigate = useNavigate()一致（其实就是包装了useNavigate额外添加清除缓存处理）

    通过配置和跳转实现效果:
    例子：A->B->C, B页面缓存，C倒回B不初始化B页面，当C倒回B,B倒回A后,再由A-B页面会刷新缓存对页面进行重载

    const App = () => {

         const customNavigate = $globalNavigate()

        const goToKeepPage = () =>{
            customNavigate('/detail')
        }

        return (
            <div onClick={()=>{goToKeepPage}}></div>
        )
    };

    export default App

```

```
6.路由(编程式)传参
  （1）使用query传参
```

```js
        跳转：

          
```

```js
        接收：

           
```

```
    (2) 使用state传参 (用于传较多参数)
```

```js
         跳转：

         
```

```js
        接收：

           
```

## 项目国际化配置

```
src/locales文件夹下：
1.ZH-CN文件夹配置中文json
2.US-EN文件夹配置英文json
3.ZH-CN/common.json、US-EN/common.json 中配置时使用：$t("文件名.json文件内定义的key") 如 $t("common.home")
4. 远程接口配置国际化覆盖本地配置：接口返回的json格式要与本地配置的json格式一致才能起到远程覆盖本地的效果

```

## 项目 redux 配置

```jsx
1.src/redux文件夹下的每个【文件夹】代表一个模块
2.模块命名规则：以文件夹作为模块名
3.在模块文件夹内，必须是：reduxAction.js、reduxReducer.js、reduxType.js这三个文件组成，每个js文件对应redux配置
4.使用了react-redux插件来把redux和页面UI关联，使用immer插件来处理redux。
5.页面使用：通过全局导入方法 $globalReduxAction('模块名')导出模块内定义的方法，
 react-redux的connect把state和方法注入页面的prpos中,页面方法可以直接解构出来供使用
import { connect } from "react-redux" // 引入react-redux
const { setShopNum } = $globalReduxAction('common') // 导入模块定义的方法
const Home = (props) => {
    const { setShopNum } =  props
    return (
        <div className="warp">
           
        </div>
    );
};
const mapStateToProps = (state) => state.common;
const mapDispatchToProps = { setShopNum };
export default connect(mapStateToProps, mapDispatchToProps)(Home);
  
```

## 样式
 1. 使用 create-react-app 创建项目自带 css-Modules
 2. 局部样式-将css文件命名为xxx.module.[css/less/scss]
 3. 局部样式、全局样式更改ui库的样式，在局部样式文件或全局样式文件内写 :global {  } 在这个global内写UI库样式进行覆盖
 4. 全局样式统一管理，在入口文件引入，组件使用时className="全局样式名称（字符串）"
 

## 项目图片

![登录](https://gitee.com/674074365/react-antd-h5/raw/master/preview/%E7%99%BB%E5%BD%95.jpeg '登录')<br />

![首页](https://gitee.com/674074365/react-antd-h5/raw/master/preview/%E9%A6%96%E9%A1%B5.jpeg '首页')<br />

![分类](https://gitee.com/674074365/react-antd-h5/raw/master/preview/%E5%88%86%E7%B1%BB.jpeg '分类')<br />

![购物车](https://gitee.com/674074365/react-antd-h5/raw/master/preview/%E8%B4%AD%E7%89%A9%E8%BD%A6.jpeg '购物车')<br />

![我的](https://gitee.com/674074365/react-antd-h5/raw/master/preview/%E6%88%91%E7%9A%84.jpeg '我的')
