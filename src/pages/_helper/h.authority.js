import { StringUtil } from "../../_util/util.string";
import { ObjectUtil } from "../../_util/util.object";

import HelperStorage from "./h.storage";

export default class HelperAuthority {
  load(authorities) {
    return new Promise((resolve, reject) => {
      try {
        let resultObj = {};
        for (let i = 0; i < authorities.length; i++) {
          let itemAuthority = StringUtil.split(authorities[i], ".");
          let itemAuthorityResource = itemAuthority[0];
          let itemAuthorityAction = itemAuthority[1];

          let result = [];
          if (ObjectUtil.hasProperty(resultObj, itemAuthorityResource)) {
            result = resultObj[itemAuthorityResource];
          }
          result.push(itemAuthorityAction);
          resultObj[itemAuthorityResource] = result;
        }

        HelperAuthority.STORE._authorityValue = resultObj;

        new HelperStorage()
          .set(
            HelperStorage.ENUM.LOCAL,
            HelperStorage.KEY.AUHTORITY,
            ObjectUtil.toString(resultObj)
          )
          .then(() => {
            resolve(true);
          })
          .catch(e => {
            reject(e);
          });
      } catch (e) {
        reject(e);
      }
    });
  }

  initial() {
    return new Promise((resolve, reject) => {
      if (ObjectUtil.keys(HelperAuthority.STORE._authorityValue).length === 0) {
        new HelperStorage()
          .exist(HelperStorage.ENUM.LOCAL, HelperStorage.KEY.AUHTORITY)
          .then(() => {
            new HelperStorage()
              .get(HelperStorage.ENUM.LOCAL, HelperStorage.KEY.AUHTORITY)
              .then(value => {
                HelperAuthority.STORE._authorityValue = ObjectUtil.toObject(
                  value
                );
              });

            resolve(true);
          })
          .catch(() => {
            resolve(true);
          });
      } else {
        resolve(true);
      }
    });
  }

  hasAuthority(elementObj, vResource, vAction) {
    console.log(HelperAuthority.STORE._authorityValue);
    return elementObj;
  }
}

HelperAuthority.STORE = {
  _authorityValue: {}
};

HelperAuthority.RESOURCE = {
  ACCOUNT: "r_acc",
  AUDIT_LOG: "r_audit_log",
  BANK_CODE: "r_bank_code",
  BANK_LIMIT_PARAM: "r_bank_limit_param",
  USER_MANAGEMENT: "r_bbo_usr_mgnt",
  COMPANY_PROFILE: "r_com_prf",
  USER_CREDENTIAL_PARAM: "r_credential_param",
  CUSTOMER_SUPPORT: "r_cust_support",
  DASHBOARD: "r_dashboard",
  DEVICE_MANAGEMENT: "r_device_mgnt",
  DOCUMENT: "r_doc",
  ERROR_MESSAGE: "r_err_msg",
  HOLIDAYS: "r_holidays",
  CUT_OFF_MAINTENANCE: "r_mod_cutoff_time",
  MESSAGE_BROADCAST: "r_msg_broadcast",
  NOTIFICATION: "r_notifications",
  BILLING_PROFILE: "r_prf_billing",
  PROMOTE_CODE: "r_promo_code",
  PAYMENT_CUT_OFF_MAINTENANCE: "r_pymt_cutoff_time",
  REPORT: "r_reports",
  RETENTION_PERIOD: "r_retention_period",
  SECURITY_PARAM: "r_security_param",
  SERVICE_PACKAGE: "r_serv_pckg",
  SYSTEM_CUT_OFF_MAINTENANCE: "r_sys_cutoff_time",
  TERM_CONDITION: "r_tnc",
  TRANSACTION_AUTHORIZATION: "r_trx_status"
};

HelperAuthority.ACTION = {
  ACCOUNT_DOWNLOAD_DETAIL: "a_acc_dl_detail",
  ACCOUNT_DOWNLOAD_LIST: "a_acc_dl_trx",
  ACCOUNT_VIEW_DETAIL: "a_acc_view_detail"
};
