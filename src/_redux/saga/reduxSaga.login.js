import { call, put } from "redux-saga/effects";

import ReduxActionLogin from "../action/reduxAction.login";

import ServiceAuthorization from "../../_service/service/service.authorization";

class ReduxSagaLogin {
  *crypto(action) {
    try {
      console.log(" - ReduxSagaLogin : crypto : [START] : *** ");

      let result = yield call(
        ServiceAuthorization.crypto,
        action.head,
        action.param
      );

      console.log(" - ReduxSagaLogin : crypto : [DONE] ", result);

      yield put(ReduxActionLogin.rCryptoDone(result));
    } catch (e) {
      console.log(" - ReduxSagaLogin : crypto : [EXCEPTION] , ", e);

      yield put(ReduxActionLogin.rError(e));
    } finally {
      console.log(" - ReduxSagaLogin : crypto : [END] : *** ");
    }
  }

  *login(action) {
    try {
      console.log(" - ReduxSagaLogin : login : [START] : *** ");

      let result = yield call(
        ServiceAuthorization.login,
        action.head,
        action.param
      );

      console.log(" - ReduxSagaLogin : login : [DONE] ", result);

      yield put(ReduxActionLogin.rLoginDone(result));
    } catch (e) {
      console.log(" - ReduxSagaLogin : login : [EXCEPTION] , ", e);

      yield put(ReduxActionLogin.rError(e));
    } finally {
      console.log(" - ReduxSagaLogin : login : [END] : *** ");
    }
  }
}

export default new ReduxSagaLogin();
