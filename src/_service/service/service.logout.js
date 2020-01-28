import { ExceptionGeneral } from "../../_exception/exception_service";

import ServiceHelperHttp from "../helper/service.helper.http";
import { ServiceEnumHTTP } from "../helper/service.enum.http";

import { AppConstant } from "../../_constant/constant.app";

class ServiceLogout {
  logout(head, param) {
    return new Promise((resolve, reject) => {
      console.log(" - - ServiceLogout : logout : [START] *** ");
      console.log(" - - ServiceLogout : logout : [HEAD] => ", head);
      console.log(" - - ServiceLogout : logout : [PARAM] => ", param);

      new ServiceHelperHttp()
        .http(
          ServiceEnumHTTP.METHOD.POST,
          ServiceEnumHTTP.PORT.DEFAULT,
          ServiceEnumHTTP.API.LOGOUT,
          {
            Authorization: head.authorizeType + " " + head.authorizeToken
          },
          {}
        )
        .then(resultObj => {
          console.log(
            " - - ServiceLogout : logout : [resultObj] , ",
            resultObj
          );

          try {
            let resultServer = resultObj;
            if (AppConstant.isDebug()) {
              resultServer = {
                startTime: "xxx",
                endTime: "xxx",
                duration: "xxx"
              };
            }

            resolve(resultServer);
          } catch (e) {
            console.log(
              " - - ServiceLogout : logout : [EXCEPTION - INNER], ",
              e
            );
            throw new ExceptionGeneral("Mapping Exception");
          }
        })
        .catch(e => {
          console.log(" - - ServiceLogout : logout : [EXCEPTION] , ", e);
          reject(e);
        });

      console.log(" - - ServiceLogout : logout : [END] *** ");
    });
  }

  logoutSummary(head, param) {
    return new Promise((resolve, reject) => {
      console.log(" - - ServiceLogout : logoutSummary : [START] *** ");
      console.log(" - - ServiceLogout : logoutSummary : [HEAD] => ", head);
      console.log(" - - ServiceLogout : logoutSummary : [PARAM] => ", param);

      new ServiceHelperHttp()
        .http(
          ServiceEnumHTTP.METHOD.GET,
          ServiceEnumHTTP.PORT.DEFAULT,
          ServiceEnumHTTP.API.LOGOUT_SUMMARY,
          { Authorization: head.authorizeType + " " + head.authorizeToken },
          {}
        )
        .then(resultObj => {
          console.log(
            " - - ServiceLogout : logoutSummary : [resultObj] , ",
            resultObj
          );

          try {
            let resultServer = resultObj;
            if (AppConstant.isDebug()) {
              resultServer = {
                summary: []
              };
            }

            resolve(resultServer);
          } catch (e) {
            console.log(
              " - - ServiceLogout : logoutSummary : [EXCEPTION - INNER], ",
              e
            );
            throw new ExceptionGeneral("Mapping Exception");
          }
        })
        .catch(e => {
          console.log(" - - ServiceLogout : logoutSummary : [EXCEPTION] , ", e);
          reject(e);
        });

      console.log(" - - ServiceLogout : logoutSummary : [END] *** ");
    });
  }
}

export default new ServiceLogout();
