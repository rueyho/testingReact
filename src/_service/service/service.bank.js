import { ExceptionGeneral } from "../../_exception/exception_service";

import ServiceHelperHttp from "../helper/service.helper.http";
import { ServiceEnumHTTP } from "../helper/service.enum.http";

import { AppConstant } from "../../_constant/constant.app";

class ServiceBank {
  search(head, param) {
    return new Promise((resolve, reject) => {
      console.log(" - - ServiceBank : search : [START] *** ");
      console.log(" - - ServiceBank : search : [HEAD] => ", head);
      console.log(" - - ServiceBank : search : [PARAM] => ", param);

      new ServiceHelperHttp()
        .http(
          ServiceEnumHTTP.METHOD.POST,
          ServiceEnumHTTP.PORT.DEFAULT,
          ServiceEnumHTTP.API.BANK.SEARCH,
          {
            Authorization: head.authorizeType + " " + head.authorizeToken
          },
          {}
        )
        .then(resultObj => {
          console.log(" - - ServiceBank : search : [resultObj] , ", resultObj);

          try {
            let resultServer = resultObj;
            if (AppConstant.isDebug()) {
              resultServer = {
                bankusers: [
                  {
                    bankUserId: "11e8d11ef05953acbed4291aae7a0276",
                    username: "10018762B",
                    name: "Wan Nur Liyana Binti Wan Anuuar Shahiddin",
                    assgnGroup: "",
                    status: "ACTIVE",
                    persona: "Admin User",
                    branchCode: "HQ",
                    branchName: "Default Head Quarter Office",
                    creationDate: "2019-07-18T09:13:24.000+0000",
                    lastLoginDate: null,
                    lastUpdatedDate: "2019-07-18T11:56:16.000+0000"
                  },
                  {
                    bankUserId: "11e8d11ef05953aabed4e59c2d35d641",
                    username: "10019818B",
                    name: "Rahmah Ramdzan",
                    assgnGroup: "",
                    status: "ACTIVE",
                    persona: "Admin User",
                    branchCode: "HQ",
                    branchName: "Default Head Quarter Office",
                    creationDate: "2019-07-18T09:13:24.000+0000",
                    lastLoginDate: null,
                    lastUpdatedDate: "2019-07-18T11:56:16.000+0000"
                  },
                  {
                    bankUserId: "11e8d11ef05953a8bed49b3edbd3b685",
                    username: "10023411B",
                    name: "Intan Diana Binti Mokhter",
                    assgnGroup: "",
                    status: "ACTIVE",
                    persona: "Admin User",
                    branchCode: "HQ",
                    branchName: "Default Head Quarter Office",
                    creationDate: "2019-07-18T09:13:24.000+0000",
                    lastLoginDate: null,
                    lastUpdatedDate: "2019-07-18T11:56:16.000+0000"
                  },
                  {
                    bankUserId: "11e8d11ef05953abbed4d785bd287c1a",
                    username: "10024565B",
                    name: "Saraswathy A/p Perumal",
                    assgnGroup: "",
                    status: "ACTIVE",
                    persona: "Admin User",
                    branchCode: "HQ",
                    branchName: "Default Head Quarter Office",
                    creationDate: "2019-07-18T09:13:24.000+0000",
                    lastLoginDate: null,
                    lastUpdatedDate: "2019-07-18T11:56:16.000+0000"
                  },
                  {
                    bankUserId: "11ea0f5def7293b2916827d68076d52f",
                    username: "10033939B",
                    name: "Liew Jian Sheng",
                    assgnGroup: "",
                    status: "ACTIVE",
                    persona: "HQ Bank Product Authorizer",
                    branchCode: "HQ",
                    branchName: "Default Head Quarter Office",
                    creationDate: "2019-11-25T08:31:11.000+0000",
                    lastLoginDate: null,
                    lastUpdatedDate: "2019-12-06T03:59:18.000+0000"
                  },
                  {
                    bankUserId: "11e8d11ef05953a9bed49d40a605990c",
                    username: "10035296B",
                    name: "Noor Fazilah Fazreen Binti Abdul Rani",
                    assgnGroup: "",
                    status: "ACTIVE",
                    persona: "Admin User",
                    branchCode: "HQ",
                    branchName: "Default Head Quarter Office",
                    creationDate: "2019-07-18T09:13:24.000+0000",
                    lastLoginDate: null,
                    lastUpdatedDate: "2019-07-18T11:56:16.000+0000"
                  },
                  {
                    bankUserId: "11e9fea9b6a22b3c9168c93baaf2b4ff",
                    username: "10035552B",
                    name: "Chong Juo Teng",
                    assgnGroup: "",
                    status: "ACTIVE",
                    persona: "HQ Bank Product Authorizer",
                    branchCode: "HQ",
                    branchName: "Default Head Quarter Office",
                    creationDate: "2019-11-04T02:20:47.000+0000",
                    lastLoginDate: null,
                    lastUpdatedDate: "2019-12-02T02:02:17.000+0000"
                  },
                  {
                    bankUserId: "11e9feaa0e410bfd91685db06563d480",
                    username: "10035553B",
                    name: "Ho Lai Mun",
                    assgnGroup: "",
                    status: "ACTIVE",
                    persona: "HQ Bank Operation Onboarding Authorizer",
                    branchCode: "HQ",
                    branchName: "Default Head Quarter Office",
                    creationDate: "2019-11-04T02:23:14.000+0000",
                    lastLoginDate: null,
                    lastUpdatedDate: "2019-11-27T06:56:30.000+0000"
                  },
                  {
                    bankUserId: "11ea0b3d9d600e199168dde2ceaf4a79",
                    username: "10035997B",
                    name: "Lim Jen Jen",
                    assgnGroup: "",
                    status: "ACTIVE",
                    persona: "HQ Bank Product Authorizer",
                    branchCode: "HQ",
                    branchName: "Default Head Quarter Office",
                    creationDate: "2019-11-20T02:29:44.000+0000",
                    lastLoginDate: null,
                    lastUpdatedDate: "2019-11-20T02:31:27.000+0000"
                  },
                  {
                    bankUserId: "11ea10c04d9b2675b53ded4797b9666f",
                    username: "10036814B",
                    name: "Nurul Aini Binti Zainal Abidin",
                    assgnGroup: "",
                    status: "ACTIVE",
                    persona: "HQ Bank Product Maker",
                    branchCode: "HQ",
                    branchName: "Default Head Quarter Office",
                    creationDate: "2019-11-27T02:47:51.000+0000",
                    lastLoginDate: null,
                    lastUpdatedDate: null
                  },
                  {
                    bankUserId: "11ea04548ff2cf119168bd4e1ef2eba3",
                    username: "C0004985",
                    name: "Sheeja Shibu",
                    assgnGroup: "",
                    status: "ACTIVE",
                    persona: "Admin User",
                    branchCode: "HQ",
                    branchName: "Default Head Quarter Office",
                    creationDate: "2019-11-11T07:26:22.000+0000",
                    lastLoginDate: null,
                    lastUpdatedDate: "2019-11-25T06:40:13.000+0000"
                  },
                  {
                    bankUserId: "11e9fb8cd796863b9168df84f2f9beb3",
                    username: "C0005187",
                    name: "Manthri Vijay Kumar",
                    assgnGroup: "",
                    status: "ACTIVE",
                    persona: "HQ Bank Product Maker",
                    branchCode: "HQ",
                    branchName: "Default Head Quarter Office",
                    creationDate: "2019-10-31T03:16:34.000+0000",
                    lastLoginDate: null,
                    lastUpdatedDate: "2019-12-16T02:47:45.000+0000"
                  },
                  {
                    bankUserId: "11e9fb873221990c916803c5c62e1e26",
                    username: "C0005188",
                    name: "Srinivasan Thavasirajan",
                    assgnGroup: "",
                    status: "ACTIVE",
                    persona: "HQ Bank Product Authorizer",
                    branchCode: "HQ",
                    branchName: "Default Head Quarter Office",
                    creationDate: "2019-10-31T02:36:09.000+0000",
                    lastLoginDate: null,
                    lastUpdatedDate: "2019-12-16T03:05:08.000+0000"
                  },
                  {
                    bankUserId: "11ea04617e0b4cfb9168a74aaa095928",
                    username: "C0005225",
                    name: "Jhansi Balmuri",
                    assgnGroup: "",
                    status: "ACTIVE",
                    persona: "HQ Bank Product Maker",
                    branchCode: "HQ",
                    branchName: "Default Head Quarter Office",
                    creationDate: "2019-11-11T08:58:56.000+0000",
                    lastLoginDate: null,
                    lastUpdatedDate: null
                  },
                  {
                    bankUserId: "11e9fb8ce787f20891685794ee47446e",
                    username: "C0005226",
                    name: "Chandra Chagaria",
                    assgnGroup: "",
                    status: "ACTIVE",
                    persona: "HQ Bank Operation Onboarding Authorizer",
                    branchCode: "HQ",
                    branchName: "Default Head Quarter Office",
                    creationDate: "2019-10-31T03:17:01.000+0000",
                    lastLoginDate: null,
                    lastUpdatedDate: "2020-01-07T08:00:37.000+0000"
                  },
                  {
                    bankUserId: "11e9fabc9f1749f6916871aa67f39137",
                    username: "C0005227",
                    name: "Ong Chee Lung",
                    assgnGroup: "",
                    status: "ACTIVE",
                    persona: "Contact Center Authorizer",
                    branchCode: "HQ",
                    branchName: "Default Head Quarter Office",
                    creationDate: "2019-10-30T02:26:04.000+0000",
                    lastLoginDate: null,
                    lastUpdatedDate: "2019-12-05T06:39:30.000+0000"
                  },
                  {
                    bankUserId: "11e9adee8ac504c6866b453447bd79ea",
                    username: "C0005228",
                    name: "Kidd Toh",
                    assgnGroup: "",
                    status: "ACTIVE",
                    persona: "Admin User",
                    branchCode: "HQ",
                    branchName: "Default Head Quarter Office",
                    creationDate: "2019-10-15T10:06:36.000+0000",
                    lastLoginDate: null,
                    lastUpdatedDate: null
                  },
                  {
                    bankUserId: "11e9fabca97d2f5191688f866a5a651e",
                    username: "C0005229",
                    name: "Kelly Chia Li Wei",
                    assgnGroup: "",
                    status: "ACTIVE",
                    persona: "HQ Bank Operation Onboarding Maker",
                    branchCode: "HQ",
                    branchName: "Default Head Quarter Office",
                    creationDate: "2019-10-30T02:26:21.000+0000",
                    lastLoginDate: null,
                    lastUpdatedDate: "2019-10-30T03:49:34.000+0000"
                  },
                  {
                    bankUserId: "11e9fabcb600284c9168b97051fff41a",
                    username: "C0005230",
                    name: "Au Yong Hai Fun",
                    assgnGroup: "",
                    status: "ACTIVE",
                    persona: "HQ Bank Operation Onboarding Authorizer",
                    branchCode: "HQ",
                    branchName: "Default Head Quarter Office",
                    creationDate: "2019-10-30T02:26:42.000+0000",
                    lastLoginDate: null,
                    lastUpdatedDate: null
                  },
                  {
                    bankUserId: "11e9fabcbe1f51f7916825eac05b3027",
                    username: "C0005231",
                    name: "Lee Zhi Hong",
                    assgnGroup: "",
                    status: "ACTIVE",
                    persona: "HQ Bank Product Maker",
                    branchCode: "HQ",
                    branchName: "Default Head Quarter Office",
                    creationDate: "2019-10-30T02:26:56.000+0000",
                    lastLoginDate: null,
                    lastUpdatedDate: null
                  }
                ],
                totalPage: 2,
                totalElement: 37
              };
            }

            resolve(resultServer);
          } catch (e) {
            console.log(" - - ServiceBank : search : [EXCEPTION - INNER], ", e);
            throw new ExceptionGeneral("Mapping Exception");
          }
        })
        .catch(e => {
          console.log(" - - ServiceBank : search : [EXCEPTION] , ", e);
          reject(e);
        });

      console.log(" - - ServiceBank : search : [END] *** ");
    });
  }

  submit(head, param) {
    return new Promise((resolve, reject) => {
      console.log(" - - ServiceBank : submit : [START] *** ");
      console.log(" - - ServiceBank : submit : [HEAD] => ", head);
      console.log(" - - ServiceBank : submit : [PARAM] => ", param);

      new ServiceHelperHttp()
        .http(
          ServiceEnumHTTP.METHOD.POST,
          ServiceEnumHTTP.PORT.DEFAULT,
          ServiceEnumHTTP.API.BANK.SUBMIT,
          {
            Authorization: head.authorizeType + " " + head.authorizeToken
          },
          {}
        )
        .then(resultObj => {
          console.log(" - - ServiceBank : submit : [resultObj] , ", resultObj);

          try {
            let resultServer = resultObj;
            if (AppConstant.isDebug()) {
              resultServer = {
                bankusers: {
                  userType: "HR",
                  userID: "1111111",
                  role: "Admin"
                }
              };
            }
            resolve(resultServer);
          } catch (e) {
            console.log(" - - ServiceBank : submit : [EXCEPTION - INNER], ", e);
            throw new ExceptionGeneral("Mapping Exception");
          }
        })
        .catch(e => {
          console.log(" - - ServiceBank : submit : [EXCEPTION] , ", e);
          reject(e);
        });

      console.log(" - - ServiceBank : submit : [END] *** ");
    });
  }
}

export default new ServiceBank();
