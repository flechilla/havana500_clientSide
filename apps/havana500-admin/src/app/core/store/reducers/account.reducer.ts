import { User } from './../../models/user.model';
import * as actions from '../actions/account.actions';

const APP_USER = 'steelERPUser';

export interface State {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  user: User;
  userClaims: any;
}

const INITIAL_STATE: State = {
  loading: false,
  loaded: false,
  failed: false,
  user: JSON.parse(localStorage.getItem(APP_USER)),
  userClaims: JSON.parse(localStorage.getItem(APP_USER))
};

export function reducer(state = INITIAL_STATE, action: actions.Actions): State {
  if (!action) {return state; }
  switch (action.type) {
    case actions.DO_LOGIN:
    case actions.DO_REGISTER:
    case actions.DO_LOGOUT: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false
      });
    }

    case actions.DO_LOGIN_SUCCESS:
    case actions.DO_REGISTER_SUCCESS: {
      console.log('Success Login: ');
      console.log(action);

      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        failed: false,
        user: action.payload,
        userClaims: action.payload
      });
    }

    case actions.DO_LOGOUT_SUCCESS: {
      return Object.assign({}, state, INITIAL_STATE);
    }

    case actions.DO_LOGIN_FAIL:
    case actions.DO_REGISTER_FAIL:
    case actions.DO_LOGOUT_FAIL: {
      console.log('ACCOUNT FAILED');
      return Object.assign({}, state, { failed: true });
    }

    case actions.ADD_USER: {
      return Object.assign({}, state, { user: action.payload });
    }

    default: {
      return state;
    }
  }
}

export const getLoggedUser = (state: State) => state.user;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;
export const getFailed = (state: State) => state.failed;
export const getUserClaims = (state: State) => state.userClaims;
