import LanguageUtil from "../_util/util.language";

export class ExceptionGeneral {
  type = LanguageUtil.label("label.exception.general.exception");
  msg = "";

  errorCode = "99";

  constructor(errorCode, errorMsg) {
    if (errorMsg != null) {
      this.msg = errorMsg;
    }
    if (errorCode != null) {
      this.errorCode = errorCode;
    }
  }
}
ExceptionGeneral.prototype.className = "ExceptionGeneral";

export class ExceptionHttp400 {
  type = "HTTP 400";
  msg = LanguageUtil.label("label.exception.http.400");

  errorCode = "63";

  constructor(errorCode, errorMsg) {
    if (errorMsg != null) {
      this.msg = errorMsg;
    }
    if (errorCode != null) {
      this.errorCode = errorCode;
    }
  }
}
ExceptionHttp400.prototype.className = "ExceptionHttp400";

export class ExceptionHttp401 {
  type = "HTTP 401";
  msg = LanguageUtil.label("label.exception.http.401");

  errorCode = "63";

  constructor(errorCode, errorMsg) {
    if (errorMsg != null) {
      this.msg = errorMsg;
    }
    if (errorCode != null) {
      this.errorCode = errorCode;
    }
  }
}
ExceptionHttp401.prototype.className = "ExceptionHttp401";

export class ExceptionHttp404 {
  type = "HTTP 404";
  msg = LanguageUtil.label("label.exception.http.404");

  errorCode = "60";

  constructor(errorCode, errorMsg) {
    if (errorMsg != null) {
      this.msg = errorMsg;
    }
    if (errorCode != null) {
      this.errorCode = errorCode;
    }
  }
}
ExceptionHttp404.prototype.className = "ExceptionHttp404";

export class ExceptionHttp405 {
  type = "HTTP 405";
  msg = LanguageUtil.label("label.exception.http.405");

  errorCode = "61";

  constructor(errorCode, errorMsg) {
    if (errorMsg != null) {
      this.msg = errorMsg;
    }
    if (errorCode != null) {
      this.errorCode = errorCode;
    }
  }
}
ExceptionHttp405.prototype.className = "ExceptionHttp405";

export class ExceptionHttp403 {
  type = "";
  msg = LanguageUtil.label("label.exception.http.403");

  errorCode = "62";

  constructor(errorCode, errorMsg) {
    if (errorMsg != null) {
      this.msg = errorMsg;
    }
    if (errorCode != null) {
      this.errorCode = errorCode;
    }
  }
}
ExceptionHttp403.prototype.className = "ExceptionHttp403";

export class ExceptionHttp500 {
  type = "HTTP 500";
  msg = LanguageUtil.label("label.exception.http.500");

  errorCode = "62";

  constructor(errorCode, errorMsg) {
    if (errorMsg != null) {
      this.msg = errorMsg;
    }
    if (errorCode != null) {
      this.errorCode = errorCode;
    }
  }
}
ExceptionHttp500.prototype.className = "ExceptionHttp500";

export class ExceptionHttp416 {
  type = "HTTP 416";
  msg = LanguageUtil.label("label.exception.http.416");

  errorCode = "64";

  constructor(errorCode, errorMsg) {
    if (errorMsg != null) {
      this.msg = errorMsg;
    }
    if (errorCode != null) {
      this.errorCode = errorCode;
    }
  }
}
ExceptionHttp416.prototype.className = "ExceptionHttp416";

export class ExceptionHttpNotEqual200 {
  type = "HTTP ! 200";
  msg = LanguageUtil.label("label.exception.http.not.equal.200");

  errorCode = "64";

  constructor(errorCode, errorMsg) {
    if (errorMsg != null) {
      this.msg = errorMsg;
    }
    if (errorCode != null) {
      this.errorCode = errorCode;
    }
  }
}
ExceptionHttpNotEqual200.prototype.className = "ExceptionHttpNotEqual200";

export class ExceptionServerMaintenance {
  type = LanguageUtil.label("label.exception.title.server.maintenace");
  msg = LanguageUtil.label("label.exception.text.server.maintenace");

  errorCode = "80";

  constructor(errorCode, errorMsg) {
    if (errorMsg != null) {
      this.msg = errorMsg;
    }
    if (errorCode != null) {
      this.errorCode = errorCode;
    }
  }
}
ExceptionServerMaintenance.prototype.className = "ExceptionServerMaintenance";

export class ExceptionServiceMaintenance {
  type = LanguageUtil.label("label.exception.title.service.maintenace");
  msg = LanguageUtil.label("label.exception.text.service.maintenace");

  errorCode = "81";

  constructor(errorCode, errorMsg) {
    if (errorMsg != null) {
      this.msg = errorMsg;
    }
    if (errorCode != null) {
      this.errorCode = errorCode;
    }
  }
}
ExceptionServiceMaintenance.prototype.className = "ExceptionServiceMaintenance";

export class ExceptionServiceNotAvailable {
  type = LanguageUtil.label("label.exception.title.service.not.available");
  msg = LanguageUtil.label("label.exception.text.service.not.available");

  errorCode = "82";

  constructor(errorCode, errorMsg) {
    if (errorMsg != null) {
      this.msg = errorMsg;
    }
    if (errorCode != null) {
      this.errorCode = errorCode;
    }
  }
}
ExceptionServiceNotAvailable.prototype.className =
  "ExceptionServiceNotAvailable";

export class ExceptionSessionExpired {
  type = LanguageUtil.label("label.exception.title.session.expired");
  msg = LanguageUtil.label("label.exception.text.session.expired");

  errorCode = "98";

  constructor(errorCode, errorMsg) {
    if (errorMsg != null) {
      this.msg = errorMsg;
    }
    if (errorCode != null) {
      this.errorCode = errorCode;
    }
  }
}
ExceptionSessionExpired.prototype.className = "ExceptionSessionExpired";

export class ExceptionRecordNotFound {
  type = LanguageUtil.label("label.exception.title.record.not.found");
  msg = LanguageUtil.label("label.exception.text.record.not.found");

  errorCode = "98";

  constructor(errorCode, errorMsg) {
    if (errorMsg != null) {
      this.msg = errorMsg;
    }
    if (errorCode != null) {
      this.errorCode = errorCode;
    }
  }
}
ExceptionRecordNotFound.prototype.className = "ExceptionRecordNotFound";
