# react mobile template

a shopping mall demo project.

## node version

```
npm-check-updates@16.14.12 (ncu -u)
nvm@1.1.11
node@20.0.0
npm@9.6.4

```

## features

1. 采用 `React18` + `vite` + `redux` + `react-redux` + `react-router-dom（v6）`
2. 可通过配置路由实现页面缓存效果（路由插件 + `react-activation` 插件组件构成） 
3. 使用 `unplugin-auto-import` 插件实现自动导入库、函数等,以$global为前缀作为全局自动导入 
4. 通过模块化配置vite插件，在 `vite-config/plugins` 文件夹下配置vite插件

## install
```
npm install

```

## dev
```
npm run dev
```

## build
```
npm run build:dev
npm run build:prod
```

## preview

![login](./preview/login.jpeg 'login')<br />

![home](./preview/home.jpeg 'home')<br />

![category](./preview/category.jpeg 'category')<br />

![cart](./preview/cart.jpeg 'cart')<br />

![profile](./preview/profile.jpeg 'profile')
