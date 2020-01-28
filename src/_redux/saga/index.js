import { takeEvery } from "redux-saga/effects";

//Enum
import { ReduxEnumLogin } from "../action/reduxAction.login";
import { ReduxEnumLogout } from "../action/reduxAction.logout";
import { ReduxEnumGlobal } from "../action/reduxAction.global";
import { ReduxEnumBank } from "../action/reduxAction.bank";
import { ReduxEnumOnBoarding } from "../action/reduxAction.onBoarding";

//Saga
import ReduxSagaLogin from "./reduxSaga.login";
import ReduxSagaLogout from "./reduxSaga.logout";
import ReduxSagaGlobal from "./reduxSaga.global";
import ReduxSagaBank from "./reduxSaga.bank";
import ReduxSagaOnBoarding from "./reduxSaga.OnBoarding ";

const root = function* reduxSaga() {
  /* #### global #### */
  yield takeEvery(ReduxEnumGlobal.REFRESH_TOKEN, ReduxSagaGlobal.refreshToken);

  /* #### Login #### */
  yield takeEvery(ReduxEnumLogin.LOGIN, ReduxSagaLogin.login);
  yield takeEvery(ReduxEnumLogin.CRYPTO, ReduxSagaLogin.crypto);

  /* #### Logout #### */
  yield takeEvery(ReduxEnumLogout.LOGOUT, ReduxSagaLogout.logout);

  /* #### Bank #### */
  yield takeEvery(ReduxEnumBank.SEARCH, ReduxSagaBank.search);
  yield takeEvery(ReduxEnumBank.SUBMIT, ReduxSagaBank.submit);

  /* #### OnBoarding #### */
  yield takeEvery(ReduxEnumOnBoarding.SEARCH, ReduxSagaOnBoarding.search);
  yield takeEvery(ReduxEnumOnBoarding.SUBMIT, ReduxSagaOnBoarding.submit);
};

export default root;
