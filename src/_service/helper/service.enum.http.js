export const ServiceEnumHTTP = {
  CONTENT_TYPE: {
    FORM: "application/x-www-form-urlencoded",
    JSON: "application/json",
  },

  PORT: {
    DEFAULT: 8080,
    ACCOUNT: 8080,
    LOGIN: 8080,
    VERIFY_USERNAME: 8080,
    CRYPTOGRAPHY: 8080,
    GRANT_ACCESS_TOKEN: 8080,
  },

  METHOD: {
    POST: "POST",

    PATCH: "PATCH",
    PUT: "PUT",

    DELETE: "DELETE",

    GET: "GET",
  },

  API: {
    PROFILE: "/authorization-server/user",
    KEEPALIVE: "/keepalive",
    REQUEST_OTP: "/service-tac-v2/ext/secured/inst-auth/request-otp-inst",
    REQUEST_OTP_PUBLIC: "/service-tac-v2/ext/public/inst-auth/request-otp-inst",
    CRYPTOGRAPHY: "/service-cryptos-v1/ext/public/cryptos",

    LOGIN: {
      VERIFY_USERNAME:
        "/server-authorization-v1/ext/public/authorization/authentication-inst",
      CRYPTOGRAPHY: "/service-cryptos-v1/ext/public/cryptos",
      GRANT_ACCESS_TOKEN:
        "/server-authorization-v1/ext/public/authorization/oauth/token",

      TERMS_CONDITION:
        "/service-terms-conditions-v1/ext/public/terms-conditions/{tncType}",
      TERMS_CONDITION_ACCEPTANCE:
        "/server-authorization-v1/ext/secured/authorization/tnc-acceptance-inst",

      REACTIVATE_PROFILE:
        "/server-authorization-v1/ext/secured/authorization/reactivation-inst",
      REACTIVATE_PROFILE_OTP:
        "/service-tac-v2/ext/secured/inst-auth/request-otp-inst",
      REACTIVATE_PROFILE_CONFIRM:
        "/server-authorization-v1/ext/secured/authorization/reactivation-inst/{instructionId}",

      BROADCAST_ANNOUNCEMENT: "/service-broadcast-v1/ext/public/broadcasts",
      DOWNTIME_ANNOUNCEMENT:
        "/service-downtime-maintenance-v2/ext/public/downtime-maintenances",
    },

    CHANGE_PASSWORD: {
      PERFORM:
        '/service-profiles-security-v3/ext/secured/profiles-security/change-password-inst',
      PERFORM_OTP: '/service-tac-v2/ext/secured/inst-auth/request-otp-inst',
      CRYPTOGRAPHY: '/service-cryptos-v1/ext/public/cryptos',
      PERFORM_CONFIRM:
        '/service-profiles-security-v3/ext/secured/profiles-security/change-password-inst/{instructionId}',
    },

    FIRST_TIME_LOGIN: {
      COUNTRY_CODES_CALLING:
        "/service-common-v1/ext/public/common/country-callingcodes",
      REQUEST_OTP: "/service-tac-v2/ext/public/inst-auth/request-otp-inst",
      REQUEST_TNC:
        "/service-terms-conditions-v1/ext/public/terms-conditions/{tncType}",

      VERIFY_USER:
        "/service-first-time-registration-v1/ext/public/first-time-registration/registration-inst",
      SECURITY_QUESTION:
        "/service-first-time-registration-v1/ext/public/first-time-registration/registration-inst/security-questions",

      REQUEST_USER_AVAILABLE: "/service-common-v1/ext/public/usernames/query",
      CREATE_PROFILE:
        "/service-first-time-registration-v1/ext/public/first-time-registration/registration-inst/",
    },

    CASH_FLOW: {
      CASH_FLOW:
        "/service-cash-flow-v2/ext/secured/infographics/query/cash-flows",
      CASH_FLOW_DATA:
        "/service-cash-flow-v2/ext/secured/infographics/query/cash-flows/info",
      CASH_FLOW_FUTURE_TRANSACTION:
        "/service-cash-flow-v2/ext/secured/infographics/query/transactions/future-dated",
    },

    COUNTRY_CALLING_CODES:
      "/service-common-v1/ext/public/common/country-callingcodes",

    AUTHORIZATION_REFRESH_TOKEN:
      "/server-authorization-v1/ext/public/authorization/oauth/token",

    ACCOUNT_LISTING: "/service-account-v2/ext/secured/accounts",
    ACCOUNT_DETAIL: "/service-account-v2/ext/secured/accounts/{accId}",
    ACCOUNT_CURRENT_TRANSACTION_FILTER:
      "/service-transaction-history-v1/ext/secured/transaction-history/query/transaction-history",
    ACCOUNT_DETAIL_LOAN: "/ext/secured/v1/accounts/loan/{accId}",

    ACCOUNT_PAY_FROM: {
      JOMPAY_ACC:
        '/service-payment-common-v3/ext/secured/payments/jompay-from-account',
      LOCAL_TRANSFER_ACC:
        '/service-payment-common-v3/ext/secured/payments/local-transfer-from-account',
      FOREIGN_TRANSFER_ACC:
        "/service-payment-common-v3/ext/secured/payments/foreign-transfer-from-account",
    },

    ACCOUNT_CURRENT_LIST: "/v1/list",
    ACCOUNT_CURRENT_DETAIL:
      "/service-account-v2/ext/secured/accounts/currents/{accId}",
    ACCOUNT_CURRENT_AMOUNT:
      "/account-read-service/v1/current/calculate/summary",
    ACCOUNT_CURRENT_TRANSACTION: "/ext/secured/v1/accounts/",

    ACCOUNT_FIXED_LIST: "/v1/list",
    ACCOUNT_FIXED_DETAIL:
      "/service-account-v2/ext/secured/accounts/fixed-deposits/{accId}",
    ACCOUNT_FIXED_AMOUNT: "/account-read-service/v1/fixed/calculate/summary",
    ACCOUNT_FIXED_TRANSACTION:
      "/account-read-service/v1/fixed/transaction/list",

    ACCOUNT_LOAN_LIST: "/v1/list",
    ACCOUNT_LOAN_DETAIL:
      "/service-account-v2/ext/secured/accounts/loans/{accId}",
    ACCOUNT_LOAN_AMOUNT: "/account-read-service/v1/loan/calculate/summary",
    ACCOUNT_LOAN_TRANSACTION: "/account-read-service/v1/loan/transaction/list",

    ACCOUNT_STATEMENT: "/account/v1",
    ACCOUNT_DOWNLOAD_DETAILS_PDF:
      "/service-account-v2/ext/secured/accounts/{accId}/pdf",
    ACCOUNT_DOWNLOAD_TRANSACTION_HISTORY_PDF:
      '/service-transaction-history-v1/ext/secured/transaction-history/query/transaction-history/pdf',
    ACCOUNT_DOWNLOAD_TRANSACTION_HISTORY:
      '/service-transaction-history-v1/ext/secured/transaction-history/query/{type}',

    BANK: "/bank/v1",
    COUNTRY: "/country/v1",
    COUNTRY_STATE: "/countrystate/v1",

    PAYMENT_LIST: "/payment-read-service/v1/list",

    PAYMENT_BULK_INIT: "/payment-read-service/v1/bulk/init",
    PAYMENT_BULK_SUMMARY: "/payment-read-service/v1/bulk/summary",
    PAYMENT_BULK_CONFIRM: "/payment-read-service/v1/bulk/confirm",

    PAYMENT_TRANSFER_INIT: "/payment-read-service/v1/transfer/init",
    PAYMENT_TRANSFER_SUMMARY: "/payment-read-service/v1/transfer/summary",
    PAYMENT_TRANSFER_CONFIRM: "/payment-read-service/v1/transfer/confirm",

    PAYMENT_BILL_INIT: "/payment-read-service/v1/bill/init",
    PAYMENT_BILL_SUMMARY: "/payment-read-service/v1/bill/summary",
    PAYMENT_BILL_CONFIRM: "/payment-read-service/v1/bill/confirm",

    PAYROLL_LIST: "/payroll/v1/list",
    PAYROLL_INIT: "/payroll/v1/init",
    PAYROLL_ADD: "/payroll/v1/add",
    PAYROLL_DETAIL: "/payroll/v1/detail",
    PAYROLL_CALCULATE: "/payroll/v1/calculate",

    EMPLOYEE_EDIT: "/employee/v1/edit",
    EMPLOYEE_ADD: "/employee/v1/add",
    EMPLOYEE_DELETE: "/employee/v1/delete",
    EMPLOYEE_COUNT: "/employee/v1/count",
    EMPLOYEE_LIST: "/employee/v1/list",

    GENERAL_ID_TYPE: "/general/v1",

    RECIPIENT_LIST: "/recipient/v1",

    BRANCH_LOCATION: "/branchlocation/v1",
    FX_RATE: "/fxRate/v1",

    SUMMARY_CALCULATE: "/summary/v1/calculate",
    SUMMARY_LIST: "/summary/v1/list",

    CHANGE_SECURE_IMAGE_CURRENT_IMAGE:
      '/service-profiles-security-v3/ext/secured/profiles-security/secure-phrase',
    CHANGE_SECURE_IMAGE_PERFORM_CHANGE:
      '/service-profiles-security-v3/ext/secured/profiles-security/change-securephrase-inst',
    CHANGE_SECURE_IMAGE_CONFIRM:
      '/service-profiles-security-v3/ext/secured/profiles-security/change-securephrase-inst/',

    CHANGE_SECURE_QUESTION_LIST:
      '/service-profiles-security-v3/ext/secured/profiles-security/change-secques-inst/security-questions',
    CHANGE_SECURE_QUESTION_CONFIRM:
      '/service-profiles-security-v3/ext/secured/profiles-security/change-secques-inst/',

    CHANGE_SECURE_QUESTION_PERFORM:
      '/service-profiles-security-v3/ext/secured/profiles-security/change-secques-inst',

    FORGOT_USER_ID_PERFORM:
      "/service-forget-username-v1/ext/public/forget-username/forgot-username-inst",
    FORGOT_USER_ID_REQUEST_SECURE_QUESTION:
      "/ext/public/v1/query/security-questions",
    FORGOT_USER_ID_CONFIRM:
      "/service-forget-username-v1/ext/public/forget-username/forgot-username-inst/",

    FORGOT_PASSWORD_PERFORM:
      "/service-reset-password-v1/ext/public/reset-password/reset-password-inst",
    FORGOT_PASSWORD_VERIFY_SECURE_QUESTION:
      "/service-reset-password-v1/ext/public/reset-password/reset-password-inst/{instructionId}/verify-secques",
    FORGOT_PASSWORD_REQUEST_SECURE_QUESTION:
      "/ext/public/v1/query/security-questions",
    FORGOT_PASSWORD_CONFIRM:
      "/service-reset-password-v1/ext/public/reset-password/reset-password-inst/",

    CASH_FLOW_TRANSACTION_SCHEDULED:
      "/ext/secured/v1/query/transactions/scheduled",

    LOGOUT: "/server-authorization-v1/ext/secured/authorization/logout-inst",
    LOGOUT_SUMMARY:
      "/server-authorization-v1/ext/secured/authorization/activity-summary",

    HELP: "/service-help-v1/ext/public/help/login",

    PROFILE_FEEDBACK:
      "/service-feedback-v1/ext/secured/feedbacks/send-feedback-inst",
    SEND_FEEDBACK:
      "/service-feedback-v1/ext/secured/feedbacks/send-feedback-inst",

    HOME_CASH_FLOW:
      "/service-cash-flow-v2/ext/secured/infographics/query/cash-flows",
    HOME_BROADCAST_ANNOUNCEMENT: "/service-broadcast-v1/ext/secured/broadcasts",
    HOME_DOWNTIME_ANNOUNCEMENT:
      "/service-downtime-maintenance-v2/ext/secured/downtime-maintenances",

    RESET_PROFILE: {
      VERIFY_USER:
        "/service-reset-profile-v2/ext/public/reset-profile/reset-profile-inst",
      REFRESH_SECURITY_QUESTIONS:
        "/service-reset-profile-v2/ext/public/reset-profile/reset-profile-inst/security-questions",
      TERMS_CONDITIONS:
        "/service-terms-conditions-v1/ext/public/terms-conditions/",
      USERNAME_AVAILABILITY: "/service-common-v1/ext/public/usernames/query",
      RESET_PROFILE:
        "/service-reset-profile-v2/ext/public/reset-profile/reset-profile-inst/",
      COUNTRY_CODES_CALLING:
        "/service-common-v1/ext/public/common/country-callingcodes",
      CRYPTOGRAPHY: "/service-cryptos-v1/ext/public/cryptos",
    },

    GLOBAL_DRAWER: {
      PROFILE: '/service-profiles-security-v3/ext/secured/profiles',
    },
    // only hard token for now
    TOKEN: {
      // query list
      LIST: '/service-token-management-v3/ext/secured/tokens/query',

      // activate
      VERIFY:
        '/service-token-management-v3/ext/secured/tokens/hard-token/activate-token-inst',
      CONFIRM:
        '/service-token-management-v3/ext/secured/tokens/hard-token/activate-token-inst/{instructionId}',

      // reset
      RESET:
        '/service-token-management-v3/ext/secured/tokens/hard-token/reset-pin-inst',
      CONFIRM_RESET:
        '/service-token-management-v3/ext/secured/tokens/hard-token/reset-pin-inst/{instructionId}',

      // unblock
      UNBLOCK:
        '/service-token-management-v3/ext/secured/tokens/hard-token/unblock-token-inst',
      UNBLOCK_WITH_TOKEN:
        '/service-token-management-v3/ext/secured/tokens/hard-token/unblock-token-inst/{instructionId}',
      CONFIRM_UNBLOCK:
        '/service-token-management-v3/ext/secured/tokens/hard-token/unblock-token-inst/{instructionId}/confirm',

      // sync token
      SYNCHRONIZE:
        '/service-token-management-v3/ext/secured/tokens/hard-token/sync-token-inst',
      CONFIRM_SYNCHRONIZE:
        '/service-token-management-v3/ext/secured/tokens/hard-token/sync-token-inst/{instructionId}',

      REQUEST_HARD_TOKEN:
        '/service-token-management-v3/ext/secured/tokens/inst-auth/authorise-inst',

      // SoftToken
      SOFTTOKEN: {
        PERFORM:
          '/service-token-management-v3/ext/secured/tokens/soft-token/activate-token-inst',
        ASSIGN_PERFORM:
          '/service-token-management-v3/ext/secured/tokens/soft-token/assign-token-inst',
        CONFIRM_PERFORM:
          '/service-token-management-v3/ext/secured/tokens/soft-token/activate-token-inst/{instructionId}',
        DEACTIVATE:
          '/service-token-management-v3/ext/secured/tokens/soft-token/deactivate-token-inst',
        CONFIRM_DEACTIVATE:
          '/service-token-management-v3/ext/secured/tokens/soft-token/deactivate-token-inst/{instructionId}',
        CHANGE_PIN:
          '/service-token-management-v3/ext/secured/tokens/soft-token/change-pin',
        RESET:
          '/service-token-management-v3/ext/secured/tokens/soft-token/reset-token-inst',
        CONFIRM_RESET:
          '/service-token-management-v3/ext/secured/tokens/soft-token/reset-token-inst/{instructionId}',
        UPDATE_AUTH_METHOD:
          '/service-profiles-security-v3/ext/secured/profiles/update-profile-inst',
        CONFIRM_UPDATE_AUTH_METHOD:
          '/service-profiles-security-v3/ext/secured/profiles/update-profile-inst/{instructionId}',
        VERIFY_TOKEN_SERIAL_NUM:
          '/service-token-management-v3/ext/secured/tokens/soft-token/verify-token',

        REMOVE_TOKEN:
          '/service-token-management-v3/ext/secured/tokens/soft-token/remove-device-token-inst',
        CONFIRM_REMOVE_TOKEN:
          '/service-token-management-v3/ext/secured/tokens/soft-token/remove-device-token-inst/{instructionId}',
      },
    },

    // Setting page related service
    SETTING: {
      UPDATE_PROFILE:
        '/service-profiles-security-v3/ext/secured/profiles/update-profile-inst',
    },

    // JomPay bill payment
    JOMPAY: {
      CREATE_PAYMENT:
        '/service-payment-jompay-v3/ext/secured/payments/jompay/create-payment-inst',
      CONFIRM_CREATE_PAYMENT:
        '/service-payment-jompay-v3/ext/secured/payments/jompay/create-payment-inst/{instructionId}',
      APPROVE_CREATE_PAYMENT:
        '/service-payment-jompay-v3/ext/secured/payments/jompay/create-payment-inst/{instructionId}/create-payment-task',
    },

    PAYMENT: {
      LISTING: '/service-payment-common-v3/ext/secured/payments/query',
      LISTING_PAGE:
        '/service-payment-common-v3/ext/secured/payments/query?pageSize=10&pageNumber={pageNumber}',
      DETAIL:
        '/service-payment-common-v3/ext/secured/payments/instructions/{instructionId}',
      STOP_PAYMENT:
        '/service-payment-common-v3/ext/secured/payments/instructions/{instructionId}/stop',
      DOWNLOAD_PDF:
        '/service-payment-common-v3/ext/secured/payments/instructions/{instructionId}/pdf',
      MY_TASK_LISTING:
        '/service-payment-common-v3/ext/secured/payments/my-task/query',
      GET_PURPOSE_LISTING:
        '/service-payment-common-v3/ext/secured/payments/purpose/query',
      GET_HOLIDAY_DATES: '/service-holiday-v2/ext/secured/holidays',
    },

    // Local Transfer (IBG)
    LOCAL_TRANSFER: {
      BANK_LIST:
        '/service-payment-common-v3/ext/secured/payments/recipient-bank/query',
      TRANSACTION_FEE:
        '/service-payment-common-v3/ext/secured/payments/transaction-fee',
      CREATE_PAYMENT:
        '/service-payment-ibg-v3/ext/secured/payments/ibg/create-payment-inst',
      CONFIRM_CREATE_PAYMENT:
        '/service-payment-ibg-v3/ext/secured/payments/ibg/create-payment-inst/{instructionId}',
      APPROVE_CREATE_PAYMENT:
        '/service-payment-ibg-v3/ext/secured/payments/ibg/create-payment-inst/{instructionId}/create-payment-task',
      IFT: {
        CREATE_PAYMENT:
          '/service-payment-ift-v3/ext/secured/payments/ift/create-payment-inst',
        CONFIRM_CREATE_PAYMENT:
          '/service-payment-ift-v3/ext/secured/payments/ift/create-payment-inst/{instructionId}',
        APPROVE_CREATE_PAYMENT:
          '/service-payment-ift-v3/ext/secured/payments/ift/create-payment-inst/{instructionId}/create-payment-task',
        RESIDENT_STATUS:
          '/service-payment-common-v3/ext/secured/payments/recipient-resident-status',
      },
    },

    // Bulk Transfer
    BULK_TRANSFER: {
      CREATE_PAYMENT:
        '/service-payment-bulk-v3/ext/secured/payments/bulk/create-payment-inst',
      CONFIRM_CREATE_PAYMENT:
        '/service-payment-bulk-v3/ext/secured/payments/bulk/create-payment-inst/{instructionId}',
      APPROVE_CREATE_PAYMENT:
        '/service-payment-bulk-v3/ext/secured/payments/bulk/create-payment-inst/{instructionId}/create-payment-task',
      UPLOAD_DOC:
        '/service-payment-bulk-v3/ext/secured/payments/bulk/documents/{docType}/upload',
      DOWNLOAD_FILE:
        '/service-payment-bulk-v3/ext/secured/payments/bulk/documents/{docType}/download',
      DOWNLOAD_BULK_ADVISE_PDF:
        '/service-payment-common-v3/ext/secured/payments/instructions/{instructionId}/{pymtType}/{sequenceNo}/pdf',
    },

    // Device Management
    DEVICE: {
      LIST: "/service-device-management-v2/ext/secured/device-management/query",
      REMOVE:
        "/service-device-management-v2/ext/secured/device-management/remove-device-inst",
      CONFIRM_REMOVE:
        "/service-device-management-v2/ext/secured/device-management/remove-device-inst/{instructionId}",
    },

    FOREIGN_TRANSFER: {
      COUNTRY_FTT: "/service-common-v1/ext/public/common/country-ftt",
      FOREIGN_CURRENCY: "/service-common-v1/ext/public/common/foreign-currency",
      TRANSACTION_FEE: "/service-security-parameter-v2/ext/public/security-parameter/cfo_ftt_cable_charges",
      FTT_PARAMETER: '/service-security-parameter-v2/ext/public/security-parameter/{type}',
      SUBMISSION_CUTOFF_TIME: '/service-security-parameter-v2/ext/public/security-parameter/bbo_ftt_submission_cutoff_time',
      AMOUNT_REQUIRED_SUPPORTING_DOCUMENT: '/service-security-parameter-v2/ext/public/security-parameter/cfo_amount_require_supporting_document',
      CREATE_PAYMENT_INST: '/service-remittance-ftt-v1/ext/secured/payments/ftt/create-payment-inst',
      CONFIRM_CREATE_PAYMENT_INST: '/service-remittance-ftt-v1/ext/secured/payments/ftt/create-payment-inst/{instructionId}',
      CREATE_PAYMENT_SUM: '/service-remittance-ftt-v1/ext/secured/payments/ftt/ftt-payment-inst-sum/{instructionId}',
      APPROVE_CREATE_PAYMENT: '/service-remittance-ftt-v1/ext/secured/payments/ftt/create-payment-inst/{instructionId}/create-payment-task',
      FOREIGN_TNC_DECLA: '/service-terms-conditions-v1/ext/public/terms-conditions/ftt-doc',
      FTT_SERVICE_TEST: '/service-remittance-ftt-v1/ext/secured/payments/ftt/ftt-payment-inst-sum/123',
      UPLOAD_FTT_DOCUMENT : '/service-documents-v2/ext/secured/payments/documents/ftt/upload-inst',
      DELETE_FTT_DOCUMENT : '/service-documents-v2/ext/secured/payments/documents/delete',
      EDIT_FTT_DOCUMENT : '/service-documents-v2/ext/secured/payments/documents/edit',
      DOWNLOAD_FTT_DOCUMENT : '/service-documents-v2/ext/public/documents/ftt/download/{attachmentId}',
      EXTRA_FTT_DOCUMENT : '/service-remittance-ftt-v1/ext/secured/payments/ftt/documents/{instructionId}',
    },

    // Cheque Management
    CHEQUE_MANAGEMENT: {
      CREATE_REQUEST_CHEQUE: '/service-cheque-v1/ext/secured/cheque/request-cheque-inst',
      REQUEST_CHEQUE_DETAIL: '/service-cheque-v1/ext/secured/cheque/instructions/{instructionId}',
      CONFIRM_REQUEST_CHEQUE:
        '/service-cheque-v1/ext/secured/cheque/request-cheque-inst/{instructionId}',
      APPROVE_REQUEST_CHEQUE:
        '/service-cheque-v1/ext/secured/cheque/request-cheque-inst/{instructionId}/request-cheque-task',
      LISTING: '/service-cheque-v1/ext/secured/cheque/query',
      MY_TASK_LISTING: '/service-cheque-v1/ext/secured/cheque/myTask/query',
      STOP_CHEQUE: '/service-cheque-v1/ext/secured/cheque/stop-cheque-inst',
      CONFIRM_STOP_CHEQUE: '/service-cheque-v1/ext/secured/cheque/stop-cheque-inst/{instructionId}',
      APPROVE_STOP_CHEQUE: '/service-cheque-v1/ext/secured/cheque/stop-cheque-inst/{instructionId}/stop-cheque-task',
      CHEQUE_INQUIRY: '/service-cheque-v1/ext/secured/cheque/retrieve-cheque-inquiry',
      DOWNLOAD_PDF: '/service-cheque-v1/ext/secured/cheque/instructions/{instructionId}/pdf',
    },
    //Duit Now
    DUIT_NOW: {
      CREATE_PAYMENT:'/service-payment-duitnow-v1/ext/secured/payments/duitnow/create-payment-inst',
      CONFIRM_CREATE_PAYMENT:'/service-payment-duitnow-v1/ext/secured/payments/duitnow/create-payment-inst/{instructionId}',
      APPROVE_CREATE_PAYMENT: '/service-payment-duitnow-v1/ext/secured/payments/duitnow/create-payment-inst/{instructionId}/create-payment-task',
      GET_DUITNOW_TYPE:'/service-payment-common-v3/ext/secured/payments/duitnowtype',
      GET_COUNTRY_LIST:'/service-payment-common-v3/ext/secured/payments/country',
      GET_BANK_LIST: '/service-payment-common-v3/ext/secured/payments/recipient-bank/rpp/query',
      //Setting
      GET_SETTINGS_DUIT_NOW: '/service-payment-duitnow-v1/ext/secured/registrations/duitnow/get-comp-reg-details',
      REGISTER_DUIT_NOW:'/service-payment-duitnow-v1/ext/secured/registrations/duitnow/reg-duit-now',
      REQUEST_TAC:'/service-tac-v2/ext/secured/inst-auth/request-otp-inst',
      REQUEST_CONFIRM_TAC:'/service-payment-duitnow-v1/ext/secured/registrations/duitnow/reg-duit-now/registration-inst/{instructionId}'
    },
  },
};
