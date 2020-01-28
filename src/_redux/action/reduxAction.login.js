export const ReduxEnumLogin = {
  INIT: "_ReduxEnumLogin_LOGIN_INIT_",
  INIT_DONE: "_ReduxEnumLogin_LOGIN_INIT_DONE_",

  CRYPTO: "_ReduxEnumLogin_LOGIN_CRYPTO_",
  CRYPTO_DONE: "_ReduxEnumLogin_LOGIN_CRYPTO_DONE_",

  LOGIN: "_ReduxEnumLogin_LOGIN_LOGIN_",
  LOGIN_DONE: "_ReduxEnumLogin_LOGIN_PROCESS_DONE_",

  ERROR: "_ReduxEnumLogin_LOGIN_ERROR_",
  REQUEST_END: "_ReduxEnumLogin_LOGIN_REQUEST_END_"
};

class ReduxActionLogin {
  rInit(header = {}, param = {}) {
    return {
      type: ReduxEnumLogin.INIT,
      head: header,
      param: param
    };
  }
  rInitDone(result) {
    return {
      type: ReduxEnumLogin.INIT_DONE,
      _result_: result
    };
  }

  rCrypto(header = {}, param = {}) {
    return {
      type: ReduxEnumLogin.CRYPTO,
      head: header,
      param: param
    };
  }
  rCryptoDone(result) {
    return {
      type: ReduxEnumLogin.CRYPTO_DONE,
      _result_: result
    };
  }

  rLogin(header = {}, param = {}) {
    return {
      type: ReduxEnumLogin.LOGIN,
      head: header,
      param: param
    };
  }
  rLoginDone(result) {
    return {
      type: ReduxEnumLogin.LOGIN_DONE,
      _result_: result
    };
  }

  rError(error) {
    return {
      type: ReduxEnumLogin.ERROR,
      _result_: error
    };
  }
  rRequestEnd() {
    return {
      type: ReduxEnumLogin.REQUEST_END
    };
  }
}

export default new ReduxActionLogin();
