import ServiceAuthorization from "../../_service/service/service.authorization";

import HelperStorage from "./h.storage";

import { DateConstant } from "../../_util/util.date";
import { StringUtil } from "../../_util/util.string";
import moment from "moment";
import { ExceptionGeneral } from "../../_exception/exception_service";
// import { ExceptionHttp401 } from '../../_exception/exception.service'

export default new (class HelperVerifyAuthorize {
  // since this file return 1 instance of HelperVerifyAuthorize and never recreate instance,
  // use this flag to control only 1 instance to call refresh token
  isRefreshing = false;

  // use in memory variable to control last request time
  AUTHORIZATION_DATE = undefined;

  // use to compare time
  // put 2 as safe value because of token request time
  timeout = 2;

  retry = 5;

  // zombie code, will remove once new method work correctly
  // old_verify() {
  //   return new Promise((resolve, reject) => {
  //     Promise.all([
  //       new HelperStorage().get(
  //         HelperStorage.ENUM.SESSION,
  //         HelperStorage.KEY.AUTHORIZATION_DATE
  //       ),
  //       new HelperStorage().get(
  //         HelperStorage.ENUM.SESSION,
  //         HelperStorage.KEY.AUTHORIZATION_EXPIRED_IN
  //       ),
  //       new HelperStorage().get(
  //         HelperStorage.ENUM.SESSION,
  //         HelperStorage.KEY.AUTHORIZATION_REFRESH_TOKEN
  //       ),
  //       new HelperStorage().get(
  //         HelperStorage.ENUM.SESSION,
  //         HelperStorage.KEY.AUTHORIZATION_ACCESS_TOKEN
  //       ),
  //       new HelperStorage().get(
  //         HelperStorage.ENUM.SESSION,
  //         HelperStorage.KEY.AUTHORIZATION_TOKEN_TYPE
  //       ),
  //     ]).then((value) => {
  //       console.log(' =!= HelperVerifyAuthorize : value => ', value)

  //       if (StringUtil.isEmpty(value[2]) || value[2] === 'undefined') {
  //         console.log(' =!= HelperVerifyAuthorize : [ ------------ ] : *** ')
  //         console.log(
  //           ' =!= HelperVerifyAuthorize : [DIDNT HAVE REFRESH TOKEN] : *** '
  //         )
  //         console.log(' =!= HelperVerifyAuthorize : [ ------------ ] : *** ')

  //         resolve(true)
  //       } else {
  //         try {
  //           console.log(' =!= HelperVerifyAuthorize : [START] : *** ')
  //           console.log(
  //             ' =!= HelperVerifyAuthorize : [PARAM] : date => ',
  //             value[0]
  //           )
  //           console.log(
  //             ' =!= HelperVerifyAuthorize : [PARAM] : expireIn => ',
  //             value[1]
  //           )

  //           let dateObj = DateUtil.objectToDate(DateUtil.stringToDate(value[0]))
  //           let expiredDate = DateUtil.increase(
  //             dateObj,
  //             DateKeyContant.SECOND,
  //             value[1]
  //           )
  //           let differentMinute = DateUtil.differentMinute(
  //             expiredDate,
  //             DateUtil.currentDate()
  //           )

  //           console.log(
  //             ' =!= HelperVerifyAuthorize : [RESULT] : differentMinute => ',
  //             differentMinute
  //           )

  //           if (differentMinute <= 2) {
  //             console.log(
  //               ' =!= HelperVerifyAuthorize : [RESULT - EXPIRED] : [START] : *** '
  //             )

  //             ServiceAuthorization.refreshToken({}, { refreshToken: value[2] })
  //               .then((value) => {
  //                 console.log(
  //                   ' =!= HelperVerifyAuthorize : [RESULT - EXPIRED - RESULT] => ',
  //                   value
  //                 )

  //                 Promise.all([
  //                   new HelperStorage().set(
  //                     HelperStorage.ENUM.SESSION,
  //                     HelperStorage.KEY.AUTHORIZATION_ACCESS_TOKEN,
  //                     value['access_token']
  //                   ),
  //                   new HelperStorage().set(
  //                     HelperStorage.ENUM.SESSION,
  //                     HelperStorage.KEY.AUTHORIZATION_REFRESH_TOKEN,
  //                     value['refresh_token']
  //                   ),
  //                   new HelperStorage().set(
  //                     HelperStorage.ENUM.SESSION,
  //                     HelperStorage.KEY.AUTHORIZATION_TOKEN_TYPE,
  //                     value['token_type']
  //                   ),
  //                   new HelperStorage().set(
  //                     HelperStorage.ENUM.SESSION,
  //                     HelperStorage.KEY.AUTHORIZATION_EXPIRED_IN,
  //                     value['expires_in']
  //                   ),
  //                   new HelperStorage().set(
  //                     HelperStorage.ENUM.SESSION,
  //                     HelperStorage.KEY.AUTHORIZATION_DATE,
  //                     DateUtil.formatDateTimeStick(DateUtil.currentDate())
  //                   ),
  //                 ]).then(() => {
  //                   resolve(true)
  //                 })
  //               })
  //               .catch((error) => {
  //                 console.log(
  //                   ' =!= HelperVerifyAuthorize : [RESULT - EXPIRED] : [EXCEPTION] , ',
  //                   error
  //                 )
  //                 reject(error)
  //               })
  //               .finally(() => {
  //                 console.log(
  //                   ' =!= HelperVerifyAuthorize : [RESULT - EXPIRED] : [END] : *** '
  //                 )
  //               })
  //           } else {
  //             resolve(true)
  //           }
  //         } catch (e) {
  //           console.log(' =!= HelperVerifyAuthorize : [EXCEPTION] , ', e)
  //           reject(e)
  //         } finally {
  //           console.log(' =!= HelperVerifyAuthorize : [END] : *** ')
  //         }
  //       }
  //     })
  //   })
  // }
  // count = 0
  // new verify token and call refresh token as nessasary
  async verify(force = true) {
    let refreshToken = window.sessionStorage.getItem(
      HelperStorage.KEY.AUTHORIZATION_REFRESH_TOKEN
    );
    // if refresh token is null, dun do anything
    if (!StringUtil.isEmpty(refreshToken)) {
      // check is any instance refreshing, if having an running verify, ignore current 1
      if (!this.isRefreshing) {
        // get expire in time (Aron say it minutes, but i suspect it is seconds)
        let expired_in = parseInt(
            window.sessionStorage.getItem(
              HelperStorage.KEY.AUTHORIZATION_EXPIRED_IN
            ),
            10
          ),
          // calculate time
          time = moment(
            this.AUTHORIZATION_DATE ||
              moment(
                window.sessionStorage.getItem(
                  HelperStorage.KEY.AUTHORIZATION_DATE
                ),
                DateConstant.FORMAT_YEAR +
                  DateConstant.FORMAT_MONTH_SHORT +
                  DateConstant.FORMAT_DAY +
                  DateConstant.FORMAT_HOUR +
                  DateConstant.FORMAT_MINUTE +
                  DateConstant.FORMAT_SECOND +
                  DateConstant.FORMAT_MILLI_SECOND
              )
          )
            .add(expired_in, "seconds")
            .diff(moment(), "seconds");

        // check if any time is less then 1 seconds (put 1 for safe)
        // console.warn(
        //   `verifyAuth AUTHORIZATION_DATE - ${this.AUTHORIZATION_DATE}`
        // );
        console.warn(`verifyAuth time - ${time}`);
        if (time <= this.timeout || force) {
          this.isRefreshing = true;
          try {
            // record down authorization date before request
            let access_token,
              refresh_token = refreshToken,
              token_type,
              expires_in,
              count_time,
              count = 0;
            do {
              if (count > 1) {
                console.warn(`verifyAuth count - ${count}`);
              }

              if (count > this.retry) {
                // this mean that token has retries failed than 10 times!
                console.warn("refreshToken retries has failed than 10 times");
                throw new ExceptionGeneral(
                  "RT001",
                  "Refresh Token has failed more than 10 times, please refresh brower and login agian."
                );
              }

              this.AUTHORIZATION_DATE = moment();

              let {
                access_token: accessToken,
                refresh_token: refToken,
                token_type: tokenType,
                expires_in: expire_seconds
              } = await ServiceAuthorization.refreshToken(
                {},
                { refreshToken: refresh_token }
              );

              access_token = accessToken;
              refresh_token = refToken;
              token_type = tokenType;
              expires_in = expire_seconds;

              count_time = moment(this.AUTHORIZATION_DATE)
                .add(expires_in, "seconds")
                .diff(moment(), "seconds");

              console.warn(`verifyAuth count_time - ${count_time}`);

              count += 1;
            } while (count_time <= this.timeout);

            window.sessionStorage.setItem(
              HelperStorage.KEY.AUTHORIZATION_ACCESS_TOKEN,
              access_token
            );
            window.sessionStorage.setItem(
              HelperStorage.KEY.AUTHORIZATION_REFRESH_TOKEN,
              refresh_token
            );
            window.sessionStorage.setItem(
              HelperStorage.KEY.AUTHORIZATION_TOKEN_TYPE,
              token_type
            );
            window.sessionStorage.setItem(
              HelperStorage.KEY.AUTHORIZATION_EXPIRED_IN,
              expires_in
            );
            this.isRefreshing = false;
          } catch (error) {
            // remove once having error
            window.sessionStorage.removeItem(
              HelperStorage.KEY.AUTHORIZATION_ACCESS_TOKEN
            );
            window.sessionStorage.removeItem(
              HelperStorage.KEY.AUTHORIZATION_REFRESH_TOKEN
            );
            window.sessionStorage.removeItem(
              HelperStorage.KEY.AUTHORIZATION_TOKEN_TYPE
            );
            window.sessionStorage.removeItem(
              HelperStorage.KEY.AUTHORIZATION_EXPIRED_IN
            );
            // window.sessionStorage.removeItem(
            //   HelperStorage.KEY.AUTHORIZATION_DATE
            // )
            this.isRefreshing = false;
            throw error;
          }
        }
      } else {
        // this.count += 1
        // every 200 ms to check is this.verify available or not
        return new Promise(resolve =>
          setTimeout(() => {
            // this need to be careful as this might blow up call stack
            // if (this.count >= 100) {
            //   this.isRefreshing = false
            //   rejects(new ExceptionHttp401('VA001', 'Session Expired'))
            // } else {
            resolve(this.verify());
            // }
          }, 200)
        );
      }
    }
  }
})();
