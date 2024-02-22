import { SET_SHOP_NUM } from './reduxType';

// 设置购物车数量
export const setShopNum = (shopNum) =>{
	return $globalRedux.dispatch({
		type: SET_SHOP_NUM,
		shopNum,
	});
}
	
