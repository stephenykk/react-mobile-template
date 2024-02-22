import { produce } from 'immer';
import { SET_TOKEN } from './reduxType';

const defaultState = {
	token: '',
};

const login = (state = defaultState, action) =>
	produce(state, (draftState) => {
		switch (action.type) {
			case SET_TOKEN:
				draftState.token = action.token;
				break;
			default:
				return draftState;
		}
	});

export default login;
