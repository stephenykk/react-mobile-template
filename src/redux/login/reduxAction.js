import { SET_TOKEN } from './reduxType';

// 设置token
export const setToken = (token) => {
	return $globalRedux.dispatch({
		type: SET_TOKEN,
		token,
	});
};
