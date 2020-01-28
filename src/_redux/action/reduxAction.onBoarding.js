export const ReduxEnumOnBoarding = {
  SEARCH: "_ReduxEnumOnBoarding_SEARCH_",
  SEARCH_DONE: "_ReduxEnumOnBoarding_SEARCH_DONE_",

  SUBMIT: "_ReduxEnumOnBoarding_SUBMIT_",
  SUBMIT_DONE: "_ReduxEnumOnBoarding_SUBMIT_DONE_",

  ERROR: "_ReduxEnumOnBoarding_ERROR_",
  REQUEST_END: "_ReduxEnumOnBoarding_REQUEST_END_"
};

class ReduxActionOnBoarding {
  rSearch(header = {}, param = {}) {
    return {
      type: ReduxEnumOnBoarding.SEARCH,
      head: header,
      param: param
    };
  }
  rSearchDone(result) {
    return {
      type: ReduxEnumOnBoarding.SEARCH_DONE,
      _result_: result
    };
  }

  rSubmit(header = {}, param = {}) {
    return {
      type: ReduxEnumOnBoarding.SUBMIT,
      head: header,
      param: param
    };
  }
  rSubmitDone(result) {
    return {
      type: ReduxEnumOnBoarding.SUBMIT_DONE,
      _result_: result
    };
  }

  rError(error) {
    return {
      type: ReduxEnumOnBoarding.ERROR,
      _result_: error
    };
  }
  rRequestEnd() {
    return {
      type: ReduxEnumOnBoarding.REQUEST_END
    };
  }
}

export default new ReduxActionOnBoarding();
