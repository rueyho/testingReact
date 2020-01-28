import {
  ExceptionGeneral,
  ExceptionHttp400,
  ExceptionHttp404,
  ExceptionHttp405,
  ExceptionHttp401,
  ExceptionHttp500,
  ExceptionHttp403
} from "../../_exception/exception_service";

import { ObjectUtil } from "../../_util/util.object";
// import { UuidUtil } from "../../_util/util.uuid";
import { StringUtil } from "../../_util/util.string";
import { NumberUtil } from "../../_util/util.number";
import { AppConstant } from "../../_constant/constant.app";

import { ServiceEnumHTTP } from "./service.enum.http";

export default class ServiceHelperHttp {
  http(
    method,
    port,
    api,
    header,
    parameter,
    contentType = ServiceEnumHTTP.CONTENT_TYPE.JSON
  ) {
    return new Promise((resolve, reject) => {
      try {
        let _hostApi = "";
        _hostApi = AppConstant.HTTP_SERVER_IP;

        console.log(" - - - ServiceHelpHTTP : [START] : *** ");
        console.log(" - - - ServiceHelpHTTP : [HEADER] : => ", header);
        console.log(
          " - - - ServiceHelpHTTP : [URL] : => " + method + "  :: ",
          _hostApi + api
        );
        console.log(" - - - ServiceHelpHTTP : [PARAM] : => ", parameter);

        if (AppConstant.isDebug()) {
          console.log(" - - - ServiceHelpHTTP : [ ################### ] ");
          console.log(" - - - ServiceHelpHTTP : [DONE - IS DEBUG] ");
          console.log(" - - - ServiceHelpHTTP : [ ################### ] ");

          setTimeout(() => {
            resolve({});
          }, 100);
        } else {
          // if ( StringUtil.contain( AppConstant.HTTP_SERVER_IP , 'https' ) || AppConstant.isProductionEnvironment ) {
          //     // do nothing
          // } else {

          //     if ( StringUtil.containNumber( AppConstant.HTTP_SERVER_IP , ':' ) >= 2 ) {
          //         // do nothing
          //     } else {
          //         _hostApi += ':' + port;
          //     }

          // }

          _hostApi += api;

          let paramQuery = "";
          let paramsJSON = {};
          let keys = Object.keys(parameter);
          for (let i = 0; i < keys.length; i++) {
            if (paramQuery !== "") {
              paramQuery += "&";
            }

            paramQuery += keys[i] + "=" + parameter[keys[i]];
            paramsJSON[keys[i]] = parameter[keys[i]];
          }

          let _header = Object.assign(
            {},
            {
              "Content-Type": contentType
            },
            header
          );

          let _httpRequest = null;
          if (method === ServiceEnumHTTP.METHOD.GET) {
            _httpRequest = fetch(
              _hostApi +
                (StringUtil.isEmpty(paramQuery) ? "" : "?" + paramQuery),
              {
                method: method,
                headers: _header
              }
            );
          } else {
            let _tmpParam = "";
            if (_header["Content-Type"] === ServiceEnumHTTP.CONTENT_TYPE.JSON) {
              _tmpParam = ObjectUtil.toString(paramsJSON);
            } else {
              _tmpParam = paramQuery;
            }

            _httpRequest = fetch(_hostApi, {
              method: method,
              headers: _header,
              body: _tmpParam
            });
          }

          _httpRequest
            .then(async response => {
              console.log(
                " - - - ServiceHelpHTTP : [RESPONSE] : => ",
                response
              );

              if (response.status === 200) {
                let resultText = await response.text();
                let result =
                  resultText === "" ? {} : ObjectUtil.toObject(resultText);

                if (response.headers.has("numOfRec")) {
                  let page = {
                    page: NumberUtil.parseInteger(response.headers.get("page"))
                  };
                  let numOfRec = {
                    numOfRec: NumberUtil.parseInteger(
                      response.headers.get("numOfRec")
                    )
                  };
                  let totalPage = {
                    totalPage: NumberUtil.parseInteger(
                      response.headers.get("totalPage")
                    )
                  };
                  result = Object.assign(result, page, numOfRec, totalPage);
                }

                return {
                  httpCode: response.status,
                  message: result
                };
              } else {
                return {
                  httpCode: response.status,
                  message: await response.text()
                };
              }
            })
            .then(jsonResult => {
              console.log(
                " - - - ServiceHelpHTTP : [RESPONSE - JSON] : => ",
                jsonResult
              );
              // let message;

              if (jsonResult.httpCode === 200) {
                resolve(jsonResult.message);
              } else {
                let errorCode = "";
                let errorMessage = "";
                let message = "";

                try {
                  message = ObjectUtil.toObject(jsonResult.message);

                  if (ObjectUtil.hasProperty(message, "errorCode")) {
                    errorCode = message.errorCode;
                  } else {
                    if (ObjectUtil.hasProperty(message, "code")) {
                      errorCode = message.code;
                    }
                  }

                  if (ObjectUtil.hasProperty(message, "extMsg")) {
                    errorMessage = message.extMsg;
                  } else {
                    if (ObjectUtil.hasProperty(message, "error_description")) {
                      errorMessage = message.error_description;
                    }
                  }
                } catch (e) {
                  console.log(
                    " - - - ServiceHelpHTTP : [RESPONSE - JSON - EXCEPTION] : => ",
                    e
                  );
                }

                if (jsonResult.httpCode === 401) {
                  throw new ExceptionHttp401(errorCode, errorMessage);
                } else if (jsonResult.httpCode === 400) {
                  throw new ExceptionHttp400(errorCode, errorMessage);
                } else if (jsonResult.httpCode === 500) {
                  throw new ExceptionHttp500(errorCode, errorMessage);
                } else if (jsonResult.httpCode === 404) {
                  throw new ExceptionHttp404(errorCode, errorMessage);
                } else if (jsonResult.httpCode === 405) {
                  throw new ExceptionHttp405(errorCode, errorMessage);
                } else if (jsonResult.httpCode === 417) {
                  throw new ExceptionHttp405(errorCode, errorMessage);
                } else if (jsonResult.httpCode === 415) {
                  throw new ExceptionHttp405(errorCode, errorMessage);
                } else if (jsonResult.httpCode === 422) {
                  throw new ExceptionHttp405(errorCode, errorMessage);
                } else if (jsonResult.httpCode === 403) {
                  throw new ExceptionHttp403(errorCode, errorMessage);
                } else {
                  throw new ExceptionGeneral(errorCode, errorMessage);
                }
              }

              // if ( jsonResult.httpCode == 200 ) {
              //     resolve( jsonResult.message );

              // } else if ( jsonResult.httpCode == 401 ) {
              //     throw new ExceptionHttp401( jsonResult.message[ 'errorCode' ] , jsonResult.message[ 'errorExtMessage' ] );

              // } else if ( jsonResult.httpCode == 416 ) {
              //     throw new ExceptionHttp416( jsonResult.message[ 'errorCode' ] , jsonResult.message[ 'errorExtMessage' ] );

              // } else if ( jsonResult.httpCode == 400 ) {
              //     message = JSON.parse(jsonResult.message);
              //     throw new ExceptionHttp400( jsonResult.message[ 'errorCode' ] , message[ 'error_description' ] );

              // } else if ( jsonResult.httpCode != 200 ) {
              //     try {
              //         message = JSON.parse(jsonResult.message);
              //         reject(new ExceptionHttpNotEqual200(`Response error (${message.errorCode || message.code || message.error})`, `${message.extMsg || message.error_description || message.errorMsg}` || `detail : ${message.intMsg}`));
              //     } catch (error) {
              //         if (error instanceof SyntaxError) {
              //             reject(new ExceptionHttpNotEqual200(`Response Status (${jsonResult.httpCode})`, 'Network Error'));
              //         } else if (message) {
              //             reject(new ExceptionHttpNotEqual200(`Response Status (${jsonResult.httpCode})`, message.error_description));
              //         } else {
              //             reject(new ExceptionHttpNotEqual200(`Response Status (${jsonResult.httpCode})`, `General Error`));
              //         }
              //     }

              // }
              // } else if ( jsonResult.httpCode == 500 ) {
              // throw new ExceptionHttp500( jsonResult.message[ 'errorCode' ] , jsonResult.message[ 'errorExtMessage' ] );

              // } else if ( jsonResult.httpCode == 404 ) {
              //     throw new ExceptionHttp404( jsonResult.message[ 'errorCode' ] , jsonResult.message[ 'errorExtMessage' ] );

              // } else if ( jsonResult.httpCode == 405 ) {
              //     throw new ExceptionHttp405( jsonResult.message[ 'errorCode' ] , jsonResult.message[ 'errorExtMessage' ] );

              // }else if ( jsonResult.httpCode == 417 ) {
              //     throw new ExceptionHttp405( jsonResult.message[ 'errorCode' ] , jsonResult.message[ 'errorExtMessage' ] );

              // }else if ( jsonResult.httpCode == 422 ) {
              //     throw new ExceptionHttp405( jsonResult.message[ 'errorCode' ] , jsonResult.message[ 'errorExtMessage' ] );

              // } else {
              //     console.log( ' - - - ServiceHelpHTTP : [RESPONSE - JSON] : [CANT FOUND HTTP CODE] ' );
              //     throw new ExceptionGeneral( 'Network Error' );

              // }

              // if ( jsonResult.status == 0 ) {
              // resolve( jsonResult );
              //
              // } else if ( jsonResult.status == 80 ) {
              //     throw new ExceptionServerMaintenance();
              //
              // } else if ( jsonResult.status == 81 ) {
              //     throw new ExceptionServiceMaintenance();
              //
              // } else if ( jsonResult.status == 82 ) {
              //     throw new ExceptionServiceNotAvailable();
              //
              // } else if ( jsonResult.status == 98 ) {
              //     throw new ExceptionSessionExpired();
              //
              // } else {
              //     throw new ExceptionGeneral( 'Service Exception' );
              //
              // }
            })
            .catch(error => {
              console.log(
                " - - - ServiceHelpHTTP : [RESPONSE - EXCEPTION] => ",
                error
              );

              if (ObjectUtil.hasProperty(error, "msg")) {
                reject(error);
              } else {
                reject(new ExceptionGeneral(error.message));
              }
            });
        }
      } catch (err) {
        console.log(" - - - ServiceHelpHTTP : [EXCEPTION] => ", err);
        reject(new ExceptionGeneral(err.message));
      } finally {
        console.log(" - - - ServiceHelpHTTP : [END] : *** ");
      }
    });
  }
}
