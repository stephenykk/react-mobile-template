import {
	legacy_createStore as createStore,
	combineReducers,
	compose,
} from 'redux';
import { applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import reduxPromise from 'redux-promise';

// 检验类型
let modKeyType = [];
let modValueType = [];
const modReduxType = import.meta.glob('../redux/**/reduxType.js', {
	eager: true,
});
for (const [, value] of Object.entries(modReduxType)) {
	for (const [childKey, childValue] of Object.entries(value)) {
		modKeyType.includes(childKey)
			? console.error(`存在重复KEY: ${childKey}`)
			: modKeyType.push(childKey);
		modValueType.includes(childValue)
			? console.error(`存在重复VALUE: ${childValue}`)
			: modValueType.push(childValue);
	}
}

// 加载Action
let modAction = {};
const modReduxAction = import.meta.glob('../redux/**/reduxAction.js', {
	eager: true,
});
for (const [key, value] of Object.entries(modReduxAction)) {
	const moduleName = key.replace(/^\.\.\/(.*)\.\w+$/, '$1').split('/')[1];
	modAction[moduleName] = {};
	for (const [childKey, childValue] of Object.entries(value)) {
		modAction[moduleName][childKey] = childValue;
	}
}

const $globalReduxAction = (type) => {
	return modAction[type];
};

// 加载模块
let reudxReducer = {};
const modReudxReducer = import.meta.glob('../redux/**/reduxReducer.js', {
	eager: true,
});
for (const [key, value] of Object.entries(modReudxReducer)) {
	const moduleName = key.replace(/^\.\.\/(.*)\.\w+$/, '$1').split('/')[1];
	reudxReducer[moduleName] = value.default;
}

// 创建reducer(拆分reducer)
const reducer = combineReducers(reudxReducer);

// 开启 redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 使用 redux 中间件
const middleWares = applyMiddleware(thunk, reduxPromise);

// 创建 store
const $globalRedux = createStore(reducer,composeEnhancers(middleWares));


export { $globalRedux, $globalReduxAction };
