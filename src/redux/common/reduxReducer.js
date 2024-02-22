import { produce } from 'immer';
import { SET_SHOP_NUM } from './reduxType';

const defaultState = {
	shopNum: 0
};

const common = (state = defaultState, action) =>
	produce(state, (draftState) => {
		switch (action.type) {
			case SET_SHOP_NUM:
				draftState.shopNum = action.shopNum;
				break;
			default:
				return draftState;
		}
	});

export default common
