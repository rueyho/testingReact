import { call, put } from "redux-saga/effects";

import ReduxActionBank from "../action/reduxAction.bank";

import ServiceBank from "../../_service/service/service.bank";

class ReduxSagaBank {
  *search(action) {
    try {
      console.log(" - ReduxSagaBank : search : [START] : *** ");

      let result = yield call(ServiceBank.search, action.head, action.param);

      console.log(" - ReduxSagaBank : search : [DONE] ", result);

      yield put(ReduxActionBank.rSearchDone(result));
    } catch (e) {
      console.log(" - ReduxSagaBank : search : [EXCEPTION] , ", e);

      yield put(ReduxActionBank.rError(e));
    } finally {
      console.log(" - ReduxSagaBank : search : [END] : *** ");
    }
  }

  *submit(action) {
    try {
      console.log(" - ReduxSagaBank : submit : [START] : *** ");

      let result = yield call(ServiceBank.submit, action.head, action.param);

      console.log(" - ReduxSagaBank : submit : [DONE] ", result);

      yield put(ReduxActionBank.rSubmitDone(result));
    } catch (e) {
      console.log(" - ReduxSagaBank : submit : [EXCEPTION] , ", e);

      yield put(ReduxActionBank.rError(e));
    } finally {
      console.log(" - ReduxSagaBank : submit : [END] : *** ");
    }
  }
}

export default new ReduxSagaBank();
