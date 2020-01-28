export const ReduxEnumLogout = {
  INIT: "ReduxEnumLogout_INIT_",
  INIT_DONE: "ReduxEnumLogout_INIT_DONE_",

  LOGOUT: "ReduxEnumLogout_LOGOUT_",
  LOGOUT_DONE: "ReduxEnumLogout_LOGOUT_DONE_",

  LOGOUT_SUMMARY: "ReduxEnumLogout_LOGOUT_SUMMARY_",
  LOGOUT_SUMMARY_DONE: "ReduxEnumLogout_LOGOUT_SUMMARY_DONE_",

  ERROR: "ReduxEnumLogout_ERROR_",
  REQUEST_END: "ReduxEnumLogout_REQUEST_END_"
};

class ReduxActionLogout {
  rInit() {
    return {
      type: ReduxEnumLogout.INIT
    };
  }
  rInitDone(result) {
    return {
      type: ReduxEnumLogout.INIT_DONE,
      _result_: result
    };
  }

  rLogout(header = {}, param = {}) {
    return {
      type: ReduxEnumLogout.LOGOUT,
      head: header,
      param: param
    };
  }
  rLogoutDone(result) {
    return {
      type: ReduxEnumLogout.LOGOUT_DONE,
      _result_: result
    };
  }

  rLogoutSummary(header = {}, param = {}) {
    return {
      type: ReduxEnumLogout.LOGOUT_SUMMARY,
      head: header,
      param: param
    };
  }
  rLogoutSummaryDone(result) {
    return {
      type: ReduxEnumLogout.LOGOUT_SUMMARY_DONE,
      _result_: result
    };
  }

  rError(error) {
    return {
      type: ReduxEnumLogout.ERROR,
      _result_: error
    };
  }
  rRequestEnd() {
    return {
      type: ReduxEnumLogout.REQUEST_END
    };
  }
}

export default new ReduxActionLogout();
