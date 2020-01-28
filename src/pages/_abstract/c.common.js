import ComponentAbstract from "../_abstract/c.abstract";
import HelperVerifyAuthorize from "../_helper/h.verifyAuthorize";
import HelperStorage from "../_helper/h.storage";
// import serviceToken from "../../_service/service/service.token";

export class CommonComponent extends ComponentAbstract {
  getStorage(key, type = "session") {
    return window[`${type}Storage`].getItem(key);
  }

  setStorage(key, value, type = "session") {
    return window[`${type}Storage`].setItem(key, value);
  }

  async verify(force) {
    try {
      await HelperVerifyAuthorize.verify(force);
    } catch (error) {
      this.requestError(error);
      throw error;
    }
    // return Promise.all([
    //   new HelperStorage().get(
    //     HelperStorage.ENUM.SESSION,
    //     HelperStorage.KEY.AUTHORIZATION_TOKEN_TYPE
    //   ),
    //   new HelperStorage().get(
    //     HelperStorage.ENUM.SESSION,
    //     HelperStorage.KEY.AUTHORIZATION_ACCESS_TOKEN
    //   ),
    // ])
    return [
      this.getStorage(HelperStorage.KEY.AUTHORIZATION_TOKEN_TYPE),
      this.getStorage(HelperStorage.KEY.AUTHORIZATION_ACCESS_TOKEN)
    ];
  }

  // async _deactivateToken() {
  //   await this.setStateAsync({ isLoading: true });

  //   let softTokens = JSON.parse(this.getStorage(HelperStorage.KEY.PROFILE_DATA))
  //     .profile.softTokens;

  //   if (softTokens && softTokens.length === 0) {
  //     console.warn("softTokens no length");
  //     return;
  //   }

  //   let obj = {
  //     tokenId: softTokens[0].tokenId,
  //     tokenSerialNum: softTokens[0].tokenSerialNum
  //     // imeiNo: softTokens[0].imeiNo,
  //   };

  //   let [authorizeType, authorizeToken] = await this.verify();
  //   try {
  //     let result = await serviceToken.deactivateSoftToken(
  //       { authorizeType, authorizeToken },
  //       obj
  //     );
  //     [authorizeType, authorizeToken] = await this.verify(false);
  //     await serviceToken.confirmDeactivateSoftToken(
  //       { authorizeType, authorizeToken },
  //       result
  //     );
  //   } catch (error) {
  //     this.requestError(error);
  //   }
  // }

  // setStateAsync(data) {
  setStateAsync(data, callback) {
    return new Promise(resolve => {
      super.setState(data, resolve);
    }).then(callback);
  }

  handleFormChange = formKey => event => {
    let form = { ...this.state.form },
      formValidation = { ...this.state.formValidation };
    form[formKey] = event.target.value;

    if (event.target.value === undefined) {
      form[formKey] = "";
    }

    formValidation[formKey] = "";

    this.setState({ form, formValidation });
  };

  requestError(error) {
    console.warn("requestError - ", error);
    this.handlerException(error, async () => {
      //handle soft token approve errorCode
      if (error.errorCode === "HTK135") {
        // this.setState({ stApproveTimer: false })
      }
      if (error.errorCode === "HTK136") {
        await this._deactivateToken();
        // this.setState({ stApproveTimer: false })
      }

      //handle soft token activate dialog when amount over 100k
      if (error.errorCode === "HTK139") {
        this.setState({ activeStDialog: true });
      }

      await this.setStateAsync({
        stApproveTimer: ["HTK138"].includes(error.errorCode)
      });

      this.setState(
        {
          isLoading: false,
          isError: error.errorCode === "HTK139" ? false : true,
          errorMsg: error.msg,
          errorCode: error.errorCode
        },
        () => {
          window.scrollTo(0, 0);
        }
      );
    });
  }

  scrollToErrorInput = (domId, headerHeight = 70) => {
    let bodyRect = document.body.getBoundingClientRect(),
      elemRect = document.getElementById(domId).getBoundingClientRect(),
      offset = elemRect.top - bodyRect.top - headerHeight;

    window.scroll(0, offset);
  };

  // abstract component lifecycle
  _onInit() {}
  _onReady() {}
  _onDestroy() {}
  _onChange() {}
  _onChangeProps() {}
}
