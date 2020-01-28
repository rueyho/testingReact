import { call, put } from "redux-saga/effects";

import ReduxActionOnBoarding from "../action/reduxAction.onBoarding";

import ServiceOnBoarding from "../../_service/service/service.onBoarding";

class ReduxSagaOnBoarding {
  *search(action) {
    try {
      console.log(" - ReduxSagaOnBoarding : search : [START] : *** ");

      let result = yield call(
        ServiceOnBoarding.search,
        action.head,
        action.param
      );

      console.log(" - ReduxSagaOnBoarding : search : [DONE] ", result);

      yield put(ReduxActionOnBoarding.rSearchDone(result));
    } catch (e) {
      console.log(" - ReduxSagaOnBoarding : search : [EXCEPTION] , ", e);

      yield put(ReduxActionOnBoarding.rError(e));
    } finally {
      console.log(" - ReduxSagaOnBoarding : search : [END] : *** ");
    }
  }

  *submit(action) {
    try {
      console.log(" - ReduxSagaOnBoarding : submit : [START] : *** ");

      let result = yield call(
        ServiceOnBoarding.submit,
        action.head,
        action.param
      );

      console.log(" - ReduxSagaOnBoarding : submit : [DONE] ", result);

      yield put(ReduxActionOnBoarding.rSubmitDone(result));
    } catch (e) {
      console.log(" - ReduxSagaOnBoarding : submit : [EXCEPTION] , ", e);

      yield put(ReduxActionOnBoarding.rError(e));
    } finally {
      console.log(" - ReduxSagaOnBoarding : submit : [END] : *** ");
    }
  }
}

export default new ReduxSagaOnBoarding();
