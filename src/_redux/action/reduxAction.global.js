export const ReduxEnumGlobal = {
  LOGIN_SUCCESS: "ReduxEnumGlobal_LOGIN_SUCCESS",
  LOGOUT_SUCCESS: "ReduxEnumGlobal_LOGOUT_SUCCESS",

  REFRESH_TOKEN: "ReduxEnumGlobal_REFRESH_TOKEN",
  REFRESH_TOKEN_DONE: "ReduxEnumGlobal_REFRESH_TOKEN_DONE",

  REQUEST_END: "ReduxEnumGlobal_REQUEST_END",
  ERROR: "ReduxEnumGlobal_ERROR"
};

class ReduxActionGlobal {
  rLoginSuccess() {
    return {
      type: ReduxEnumGlobal.LOGIN_SUCCESS
    };
  }

  rLogoutSuccess() {
    return {
      type: ReduxEnumGlobal.LOGOUT_SUCCESS
    };
  }

  rRefreshToken(header = {}, param = {}) {
    return {
      type: ReduxEnumGlobal.REFRESH_TOKEN,
      head: header,
      param: param
    };
  }
  rRefreshTokenDone(result) {
    return {
      type: ReduxEnumGlobal.REFRESH_TOKEN_DONE,
      _result_: result
    };
  }

  rRequestEnd() {
    return {
      type: ReduxEnumGlobal.REQUEST_END
    };
  }

  rError(error) {
    return {
      type: ReduxEnumGlobal.ERROR,
      _result_: error
    };
  }
}

export default new ReduxActionGlobal();
