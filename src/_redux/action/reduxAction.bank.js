export const ReduxEnumBank = {
  SEARCH: "_ReduxEnumBank_SEARCH_",
  SEARCH_DONE: "_ReduxEnumBank_SEARCH_DONE_",

  SUBMIT: "_ReduxEnumBank_SUBMIT_",
  SUBMIT_DONE: "_ReduxEnumBank_SUBMIT_DONE_",

  ERROR: "_ReduxEnumBank_ERROR_",
  REQUEST_END: "_ReduxEnumBank_REQUEST_END_"
};

class ReduxActionBank {
  rSearch(header = {}, param = {}) {
    return {
      type: ReduxEnumBank.SEARCH,
      head: header,
      param: param
    };
  }
  rSearchDone(result) {
    return {
      type: ReduxEnumBank.SEARCH_DONE,
      _result_: result
    };
  }

  rSubmit(header = {}, param = {}) {
    return {
      type: ReduxEnumBank.SUBMIT,
      head: header,
      param: param
    };
  }
  rSubmitDone(result) {
    return {
      type: ReduxEnumBank.SUBMIT_DONE,
      _result_: result
    };
  }

  rError(error) {
    return {
      type: ReduxEnumBank.ERROR,
      _result_: error
    };
  }
  rRequestEnd() {
    return {
      type: ReduxEnumBank.REQUEST_END
    };
  }
}

export default new ReduxActionBank();
