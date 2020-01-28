import { combineReducers } from "redux";

import ReduxGlobal from "./redux.global";
import ReduxLogin from "./redux.login";
import ReduxLogout from "./redux.logout";
import ReduxBank from "./redux.bank";
import ReduxOnBoarding from "./redux.onBoarding";

const redux = combineReducers({
  ReduxLogin,
  ReduxLogout,
  ReduxGlobal,
  ReduxBank,
  ReduxOnBoarding
});

export default redux;
