// import base64 from "base-64";

import { ExceptionGeneral } from "../../_exception/exception_service";

import ServiceHelperHttp from "../helper/service.helper.http";
import { ServiceEnumHTTP } from "../helper/service.enum.http";

import { NumberUtil } from "../../_util/util.number";

import { AppConstant } from "../../_constant/constant.app";

export default new (class ServiceAuthorization {
  crypto(head, param) {
    console.log(" - - ServiceAuthorization : crypto : [START] *** ");
    console.log(" - - ServiceAuthorization : crypto : [HEAD] => ", head);
    console.log(" - - ServiceAuthorization : crypto : [PARAM] => ", param);

    return new Promise((resolve, reject) => {
      new ServiceHelperHttp()
        .http(
          ServiceEnumHTTP.METHOD.POST,
          ServiceEnumHTTP.PORT.AUTHORIZATION_CRYPTO,
          ServiceEnumHTTP.API.AUTHORIZATION_CRYPTO,
          {},
          {
            count: param.count,
            type: param.type
          }
        )
        .then(resultObj => {
          try {
            let resultServer = resultObj;
            if (AppConstant.isDebug()) {
              resultServer = {
                cryptography: [
                  {
                    publicKey: "xxxx,xxxx,xxxx",
                    randomKey: "xxxx",
                    sessionId: "xxx",
                    type: "hash"
                  }
                ]
              };
            }

            console.log(
              " - - ServiceAuthorization : crypto : [RESPONSE] >> ",
              resultServer
            );

            resolve(resultServer);
          } catch (e) {
            console.log(
              " - - ServiceAuthorization : crypto : [EXCEPTION - INNER] => ",
              e
            );
            throw new ExceptionGeneral("Mapping Exception");
          }
        })
        .catch(e => {
          console.log(
            " - - ServiceAuthorization : crypto : [EXCEPTION] => ",
            e
          );
          reject(e);
        });

      console.log(" - - ServiceAuthorization : crypto : [END] *** ");
    });
  }

  login(head, param) {
    return new Promise((resolve, reject) => {
      console.log(" - - ServiceAuthorization : login : [START] *** ");
      console.log(" - - ServiceAuthorization : login : [HEAD] => ", head);
      console.log(" - - ServiceAuthorization : login : [PARAM] => ", param);

      new ServiceHelperHttp()
        .http(
          ServiceEnumHTTP.METHOD.POST,
          ServiceEnumHTTP.PORT.AUTHORIZATION,
          ServiceEnumHTTP.API.AUTHORIZATION,
          {
            Authorization: "Basic "
            //+
            // base64.encode(
            //   AppConstant.oauthTokenClientId +
            //     ":" +
            //     AppConstant.oauthTokenClientKey
            // )
          },
          {
            username: param.loginId,
            password: param.loginPass,
            grant_type: "password"
          },
          ServiceEnumHTTP.CONTENT_TYPE.FORM
        )
        .then(resultObj => {
          try {
            let resultServer = resultObj;
            if (AppConstant.isDebug()) {
              resultServer = {
                access_token: "xxx",
                refresh_token: "xxx",
                expires_in: NumberUtil.random(10, 300),
                token_type: "xxx",
                name: "rueyy"
              };

              console.log(
                " - - ServiceAuthorization : login : [RESPONSE] => ",
                resultServer
              );

              resolve(resultServer);
            } else {
              console.log(
                " - - ServiceAuthorization : login : [RESPONSE] => ",
                resultServer
              );

              resolve(resultServer);
            }
          } catch (e) {
            console.log(
              " - - ServiceAuthorization : login : [EXCEPTION - INNER] , ",
              e
            );
            throw new ExceptionGeneral("Mapping Exception");
          }
        })
        .catch(e => {
          console.log(" - - ServiceAuthorization : login : [EXCEPTION] , ", e);
          reject(e);
        });

      console.log(" - - ServiceAuthorization : login : [END] *** ");
    });
  }

  refreshToken(head, param) {
    return new Promise((resolve, reject) => {
      console.log(" - - ServiceAuthorization : refreshToken : [START] *** ");
      console.log(
        " - - ServiceAuthorization : refreshToken : [HEAD] => ",
        head
      );
      console.log(
        " - - ServiceAuthorization : refreshToken : [PARAM] => ",
        param
      );

      new ServiceHelperHttp()
        .http(
          ServiceEnumHTTP.METHOD.POST,
          ServiceEnumHTTP.PORT.DEFAULT,
          ServiceEnumHTTP.API.AUTHORIZATION_REFRESH_TOKEN,
          {
            Authorization: "Basic "
            //+
            // base64.encode(
            //   AppConstant.oauthTokenClientId +
            //     ":" +
            //     AppConstant.oauthTokenClientKey
            // )
          },
          {
            grant_type: "refresh_token",
            refresh_token: param.refreshToken
          },
          ServiceEnumHTTP.CONTENT_TYPE.FORM
        )
        .then(resultObj => {
          try {
            let resultServer = resultObj;
            if (AppConstant.isDebug()) {
              resultServer = {
                access_token: "qqqqq - " + NumberUtil.random(10, 9999999),
                refresh_token: "qqqq",
                expires_in: 5,
                token_type: "xxx"
              };
            }

            console.log(
              " - - ServiceAuthorization : refreshToken : [RESPONSE] => ",
              resultServer
            );

            resolve(resultServer);
          } catch (e) {
            console.log(
              " - - ServiceAuthorization : refreshToken : [EXCEPTION - INNER] , ",
              e
            );
            throw new ExceptionGeneral("Mapping Exception");
          }
        })
        .catch(e => {
          console.log(
            " - - ServiceAuthorization : refreshToken : [EXCEPTION] , ",
            e
          );
          reject(e);
        });

      console.log(" - - ServiceAuthorization : refreshToken : [END] *** ");
    });
  }

  profile(head, param) {
    return new Promise((resolve, reject) => {
      console.log(" - - ServiceAuthorization : profile : [START]  *** ");
      console.log(" - - ServiceAuthorization : profile : [HEAD] => ", head);
      console.log(" - - ServiceAuthorization : profile : [PARAM] => ", param);

      new ServiceHelperHttp()
        .http(
          ServiceHelperHttp.METHOD.GET,
          ServiceHelperHttp.PORT.DEFAULT,
          ServiceHelperHttp.API.PROFILE,
          {
            Authorization: head.authorizeType + " " + head.authorizeToken
          },
          {}
        )
        .then(resultObj => {
          try {
            let resultServer = resultObj;
            if (AppConstant.isDebug()) {
              resultServer = {};
            }

            console.log(
              " - - ServiceAuthorization : profile : [RESPONSE] => ",
              resultServer
            );

            resolve(resultServer);
          } catch (e) {
            console.log(
              " - - ServiceAuthorization : profile : [EXCEPTION - INNER] , ",
              e
            );
            throw new ExceptionGeneral("Mapping Exception");
          }
        })
        .catch(e => {
          console.log(
            " - - ServiceAuthorization : profile : [EXCEPTION] , ",
            e
          );
          reject(e);
        });

      console.log(" - - ServiceAuthorization : profile : [END] *** ");
    });
  }
})();
