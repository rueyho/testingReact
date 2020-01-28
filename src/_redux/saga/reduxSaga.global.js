import { call, put } from "redux-saga/effects";

import ReduxActionGlobal from "../action/reduxAction.global";

import ServiceAuthorization from "../../_service/service/service.authorization";

class ReduxSagaGlobal {
  *refreshToken(action) {
    try {
      console.log(" - ReduxSagaGlobal : refreshToken : [START] : *** ");

      let result = yield call(
        ServiceAuthorization.refreshToken,
        action.head,
        action.param
      );

      console.log(" - ReduxSagaGlobal : refreshToken : [DONE]  ", result);

      yield put(ReduxActionGlobal.rRefreshTokenDone(result));
    } catch (e) {
      console.log(" - ReduxSagaGlobal : refreshToken : [EXCEPTION] , ", e);
      yield put(ReduxActionGlobal.rError(e));
    } finally {
      console.log(" - ReduxSagaGlobal : refreshToken : [END] : *** ");
    }
  }
}

export default new ReduxSagaGlobal();
