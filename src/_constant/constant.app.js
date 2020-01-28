export const AppConstant = {
  // HTTP_SERVER_IP                        : 'http://10.122.177.58:8765'
  HTTP_SERVER_IP: (() => {
    /* ########################################### */
    /* 		IE not function   */
    /* ########################################### */
    if (!window.location.origin) {
      window.location.origin =
        window.location.protocol +
        "//" +
        window.location.hostname +
        (window.location.port ? ":" + window.location.port : "");
    }
    return window.location.origin;
  })(),

  appName: "AmAccess Biz",

  /*
        option :
              - memory
              - path
    */
  navigateType: "memory",

  oauthTokenClientId: "webCib",
  oauthTokenClientKey: "amsecret",

  hasWarningMessage: false,

  validScope: "cib",

  navigateRootPath: "/",

  isDebug: function() {
    return true;
    // if (
    //   window.location.hostname.indexOf("localhost") !== -1 &&
    //   window.location.port === 3000
    // ) {
    //   return true;
    // } else {
    //   return false;
    // }
  },

  isNavigateMemory() {
    return AppConstant.navigateType === "memory";
  },
  isNavigatePath() {
    return AppConstant.navigateType === "path";
  },

  displayWarningMsg: function() {
    if (AppConstant.hasWarningMessage === false) {
      AppConstant.hasWarningMessage = true;
      return true;
    } else {
      return false;
    }
  }
};
