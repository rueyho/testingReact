import { Component } from "react";

import { UuidUtil } from "../../_util/util.uuid";
import { ObjectUtil } from "../../_util/util.object";
import { StringUtil } from "../../_util/util.string";

import {
  ExceptionGeneral,
  ExceptionHttp404,
  ExceptionHttp405,
  ExceptionHttp500,
  ExceptionHttp401,
  ExceptionHttp416,
  ExceptionHttp403,
  ExceptionServerMaintenance,
  ExceptionServiceMaintenance,
  ExceptionServiceNotAvailable,
  ExceptionSessionExpired
} from "../../_exception/exception_service";

/* ################################################### */
/* 		 redux		 */
/* ################################################### */

/* ################################################### */
/* 		 util		 */
/* ################################################### */

import HelperNavigate, { HelperNavigateENUM } from "../_helper/h.navigate";

export default class ComponentAbstract extends Component {
  _uuid = "";

  constructor(props) {
    super();

    this._uuid = UuidUtil.get();
  }

  /*
		################################################################################################################################################
		################################################################################################################################################
				listener
		################################################################################################################################################
		################################################################################################################################################
	*/
  componentWillMount() {
    this._callFunction("_onInit");
  }

  componentDidMount() {
    this._callFunction("_onReady");
  }

  componentWillUnmount() {
    this._callFunction("_onDestroy");
  }

  componentDidUpdate(prevProps, prevState) {
    this._callFunction("_onChange", arguments);
  }
  componentWillReceiveProps(nextProps) {
    this._callFunction("_onChangeProps", arguments);

    if (nextProps.hasOwnProperty("onReadyFunction")) {
      if (ObjectUtil.hasProperty(nextProps, "_result_")) {
        this._callFunction(nextProps["onReadyFunction"], [
          nextProps["_result_"]
        ]);
      } else {
        this._callFunction(nextProps["onReadyFunction"]);
      }
    }
  }

  /*
		################################################################################################################################################
		################################################################################################################################################
				util
		################################################################################################################################################
		################################################################################################################################################
	*/
  uuid() {
    return this._uuid;
  }

  _callFunction(funcName, args) {
    if (this[funcName] instanceof Function) {
      if (args) {
        this[funcName].apply(this, args);
      } else {
        this[funcName].apply(this);
      }
    }
  }

  dispatch(action) {
    return this.props.dispatch(action);
  }

  handlerException(e, funcReady = () => {}) {
    let exceptionName = "";

    try {
      if (!StringUtil.isEmpty(e.className)) {
        exceptionName = e.className;
      }
    } catch (err) {}

    if (exceptionName === ExceptionGeneral.prototype.className) {
      funcReady();
    } else if (
      exceptionName === ExceptionHttp403.prototype.className ||
      exceptionName === ExceptionHttp404.prototype.className ||
      exceptionName === ExceptionHttp405.prototype.className ||
      exceptionName === ExceptionHttp500.prototype.className ||
      exceptionName === ExceptionHttp416.prototype.className
    ) {
      funcReady();
    } else if (
      exceptionName === ExceptionServerMaintenance.prototype.className
    ) {
      funcReady();
    } else if (
      exceptionName === ExceptionServiceMaintenance.prototype.className ||
      exceptionName === ExceptionServiceNotAvailable.prototype.className
    ) {
      funcReady();
    } else if (
      exceptionName === ExceptionSessionExpired.prototype.className ||
      exceptionName === ExceptionHttp401.prototype.className
    ) {
      // funcReady();

      HelperNavigate.route(HelperNavigate.mapPath(HelperNavigateENUM.LOGOUT), {
        error: e.msg
      });
    } else {
      funcReady();
    }
  }

  downloadFile(fileName, resData, fileType) {
    let type = fileType || "csv";
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      console.log("Download File, IE");
      window.navigator.msSaveOrOpenBlob(new Blob([resData]), fileName);
    } else {
      console.log("Download File");
      var blob = new Blob([resData], {
        type: `data:text/${type};charset=utf-8;`
      });

      var csvUrl = URL.createObjectURL(blob);
      var aLink = document.createElement("a");
      aLink.download = fileName;
      // aLink.href = `data:text/${type};charset=UTF-8,${encodeURIComponent(resData)}`;
      aLink.href = csvUrl;
      var event = new MouseEvent("click");
      aLink.dispatchEvent(event);
    }
    this.setState({ isLoading: false });
  }
}
