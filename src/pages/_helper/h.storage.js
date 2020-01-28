import { ObjectUtil } from "../../_util/util.object";

export default class HelperStorage {
  static ENUM = {
    SESSION: "session",
    LOCAL: "local",
    COOKIE: "cookie"
  };

  static KEY = {
    IS_LOGIN: "isLogin",
    IS_DEBUG: "debug",
    LAST_REFRESH: "last_refresh",

    AUTHORIZATION_DATE: "authorize_date",
    AUTHORIZATION_EXPIRED_IN: "authorize_expiredIn",
    AUTHORIZATION_TOKEN_TYPE: "authorize_tokenType",
    AUTHORIZATION_ACCESS_TOKEN: "authorize_accessToken",
    AUTHORIZATION_REFRESH_TOKEN: "authorize_refreshToken",
    AUTHORIZATION_SCOPE: "authorize_scope",

    AUTHORIZATION_LOGIN_ID: "authorize_login_id",

    PROFILE_DATA: "profiles_data",

    PROFILE_USER_UUID: "profile_user_uuid",
    PROFILE_USER_LOGIN: "profile_user_login",

    USERNAME: "username"
  };

  get(vEnum, key) {
    return new Promise((resolve, reject) => {
      try {
        if (vEnum === HelperStorage.ENUM.COOKIE) {
          let jsonCookie = ObjectUtil.toObject(document.cookie);
          resolve(jsonCookie[key]);
        } else if (vEnum === HelperStorage.ENUM.SESSION) {
          resolve(window.sessionStorage.getItem(key));
        } else {
          resolve(window.localStorage.getItem(key));
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  set(vEnum, key, value) {
    return new Promise((resolve, reject) => {
      try {
        if (vEnum === HelperStorage.ENUM.COOKIE) {
          let jsonCookie = ObjectUtil.toObject(document.cookie);
          jsonCookie[key] = value;
          document.cookie = ObjectUtil.toString(jsonCookie);
          resolve(true);
        } else if (vEnum === HelperStorage.ENUM.SESSION) {
          window.sessionStorage.setItem(key, value);
          resolve(true);
        } else {
          window.localStorage.setItem(key, value);
          resolve(true);
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  exist(vEnum, key) {
    return new Promise((resolve, reject) => {
      try {
        if (vEnum === HelperStorage.ENUM.COOKIE) {
          let jsonCookie = ObjectUtil.toObject(document.cookie);
          resolve(ObjectUtil.hasProperty(jsonCookie, key));
        } else if (vEnum === HelperStorage.ENUM.SESSION) {
          for (let i = 0; i < window.sessionStorage.length; i++) {
            if (window.sessionStorage.key(i) === key) {
              resolve(true);
            }
          }
        } else {
          for (let i = 0; i < window.localStorage.length; i++) {
            if (window.localStorage.key(i) === key) {
              resolve(true);
            }
          }
        }
        resolve(false);
      } catch (e) {
        reject(e);
      }
    });
  }

  remove(vEnum, key) {
    return new Promise((resolve, reject) => {
      try {
        if (vEnum === HelperStorage.ENUM.COOKIE) {
          let jsonCookie = ObjectUtil.toObject(document.cookie);
          jsonCookie = ObjectUtil.remove(jsonCookie, key);
          document.cookie = ObjectUtil.toString(jsonCookie);
        } else if (vEnum === HelperStorage.ENUM.SESSION) {
          window.sessionStorage.removeItem(key);
        } else {
          window.localStorage.removeItem(key);
        }
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  }

  clear(vEnum) {
    console.log("HelperStorage : *** clear : " + vEnum);

    return new Promise((resolve, reject) => {
      try {
        if (vEnum === HelperStorage.ENUM.COOKIE) {
          if (document.cookie) {
            let jsonCookie = ObjectUtil.toObject();
            let keys = ObjectUtil.keys(jsonCookie);
            for (let i = 0; i < keys.length; i++) {
              if (keys[i] !== HelperStorage.KEY.LAST_REFRESH) {
                jsonCookie = ObjectUtil.remove(jsonCookie, keys[i]);
              }
            }
            document.cookie = ObjectUtil.toString(jsonCookie);
          }
        } else if (vEnum === HelperStorage.ENUM.SESSION) {
          let lastRefresh = window.sessionStorage.getItem(
            HelperStorage.KEY.LAST_REFRESH
          );
          window.sessionStorage.clear();
          window.sessionStorage.setItem(
            HelperStorage.KEY.LAST_REFRESH,
            lastRefresh
          );
        } else {
          let lastRefresh = window.localStorage.getItem(
            HelperStorage.KEY.LAST_REFRESH
          );
          window.localStorage.clear();
          window.localStorage.setItem(
            HelperStorage.KEY.LAST_REFRESH,
            lastRefresh
          );
        }

        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  }

  clearAll() {
    return Promise.all([
      new HelperStorage().clear(HelperStorage.ENUM.COOKIE),
      new HelperStorage().clear(HelperStorage.ENUM.SESSION),
      new HelperStorage().clear(HelperStorage.ENUM.LOCAL)
    ]);
  }
}

export const HelperStorageStatic = new HelperStorage();
