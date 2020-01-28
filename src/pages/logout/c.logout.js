import React from "react";
import { connect } from "react-redux";

/* ################################################### */
/*          UI Framework         */
/* ################################################### */
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
// import FlatButton from "material-ui/FlatButton";

/* ################################################### */
/*          redux        */
/* ################################################### */

import ReduxActionLogout, {
  ReduxEnumLogout
} from "../../_redux/action/reduxAction.logout";

/* ################################################### */
/*          component        */
/* ################################################### */

import ComponentAbstract from "../_abstract/c.abstract";

/* ################################################### */
/* 		 util		 */
/* ################################################### */

import HelperNavigate, { HelperNavigateENUM } from "../_helper/h.navigate";
import HelperStorage from "../_helper/h.storage";

import { DateUtil } from "../../_util/util.date";
import { NumberUtil } from "../../_util/util.number";

// import "./s.logout.css";

export default connect((state, ownProps) => {
  let thisState = state["ReduxLogout"];
  let stateObj = {};

  if (thisState) {
    for (let i = 0; i < thisState.length; i++) {
      let recordItem = thisState[i];
      if (!recordItem["completed"]) {
        if (ReduxEnumLogout.LOGOUT_DONE === recordItem["type"]) {
          stateObj["onReadyFunction"] = "requestLogoutDone";
          stateObj["_result_"] = recordItem["_result_"];
        } else if (ReduxEnumLogout.ERROR === recordItem["type"]) {
          stateObj["onReadyFunction"] = "requestError";
          stateObj["_result_"] = recordItem["_result_"];
        }
        recordItem["completed"] = true;
      }
    }
  }

  return stateObj;
})(
  class ComponentLogout extends ComponentAbstract {
    constructor(props) {
      super(props);

      console.log(
        "ComponentLogout : constructor : *** : [" + this.uuid() + "] ",
        props
      );

      this.state = {
        isLoading: false,
        isSubmit: false,

        form: {
          startTime: DateUtil.format(new Date(), "DD/MM/YYYY HH:mm:ss a"),
          endTime: DateUtil.format(new Date(), "DD/MM/YYYY HH:mm:ss a"),
          duration: "00:00:00"
        },

        result: {
          logout: {}
        },

        isError: false,
        errorMsg: "",
        errorCode: ""
      };
    }

    /*
        		################################################################################################################################################
        		################################################################################################################################################
        				listener
        		################################################################################################################################################
        		################################################################################################################################################
        	*/
    _onReady() {
      this.requestLogout();
    }

    /*
        		################################################################################################################################################
        		################################################################################################################################################
        				event
        		################################################################################################################################################
        		################################################################################################################################################
        	*/
    onClickLogin() {
      HelperNavigate.route(HelperNavigate.mapPath(HelperNavigateENUM.LOGIN));
    }

    /*
        		################################################################################################################################################
        		################################################################################################################################################
        				request
        		################################################################################################################################################
        		################################################################################################################################################
        	*/

    requestLogout() {
      console.log("ComponentLogout : requestLogout : *** ");

      this.setState({ isLoading: true }, () => {
        Promise.all([
          new HelperStorage().get(
            HelperStorage.ENUM.SESSION,
            HelperStorage.KEY.AUTHORIZATION_TOKEN_TYPE
          ),
          new HelperStorage().get(
            HelperStorage.ENUM.SESSION,
            HelperStorage.KEY.AUTHORIZATION_ACCESS_TOKEN
          )
        ])
          .then(value => {
            console.log("requestLogout : authorize : ", value);

            this.dispatch(
              ReduxActionLogout.rLogout(
                {
                  authorizeType: value[0],
                  authorizeToken: value[1]
                },
                {}
              )
            );
          })
          .catch(error => {
            this.requestError(error);
          });

        // }
        // )
      });
    }

    requestLogoutDone(result) {
      console.log(
        "ComponentLogout :  requestLogoutDone : *** : result => ",
        result
      );

      let resultState = this.state.result;
      resultState["logout"] = result;

      let formState = this.state.form;
      if (result["startTime"] && result["endTime"] && result["duration"]) {
        try {
          let startDate = DateUtil.format(
            result["startTime"],
            "DD/MM/YYYY HH:mm:ss a"
          );
          let endDate = DateUtil.format(
            result["endTime"],
            "DD/MM/YYYY HH:mm:ss a"
          );
          let duration =
            NumberUtil.parseInteger(result["duration"] / 1000 / 60) +
            ":" +
            NumberUtil.parseInteger(
              result["duration"] / 1000 -
                NumberUtil.parseInteger(result["duration"] / 1000 / 60) * 60
            );

          formState["startTime"] = startDate;
          formState["endTime"] = endDate;
          formState["duration"] = duration;
        } catch (e) {
          console.log(
            "ComponentLogout : requestLogoutDone : *** : [EXCEPTION] , ",
            e
          );
        }
      }

      this.setState(
        { result: resultState, form: formState, isLoading: false },
        () => {
          new HelperStorage().clearAll().then(() => {});
        }
        // () => {
        //     this.requestLogoutSummary();
        // }
      );

      this.dispatch(ReduxActionLogout.rRequestEnd());
    }

    // fix #1511 - BBO logout prompt request unauthorized
    // root cause: token might cannot be renew / token renew-ed
    // but logout API return error will come into this function which
    // cause user see prompt
    //
    // solution: any error that happened on this component,
    // don't show any error (not good but temporary)
    requestError(result) {
      console.warn("ComponentLogout : requestError : *** : result => ", result);

      this.setState({
        isLoading: false
        // isError: true,
        // errorMsg: result.msg,
        // errorCode: result.errorCode,
      });

      this.dispatch(ReduxActionLogout.rRequestEnd());
    }

    /*
        		################################################################################################################################################
        		################################################################################################################################################
        				render
        		################################################################################################################################################
        		################################################################################################################################################
        	*/
    render() {
      return (
        <div className={"logout-panel"}>
          <Grid>
            {/* <Button
                label="back to login"
                onClick={() => {
                  HelperNavigate.route(
                    HelperNavigate.mapPath(HelperNavigateENUM.LOGIN)
                  );
                }}
              /> */}
          </Grid>

          {/* <ComponentCustomLoading visible={this.state.isLoading} />

          <ComponentCustomAlert
            visible={this.state.isError}
            title={"Error"}
            msg={this.state.errorMsg}
            errorCode={this.state.errorCode}
            onClose={() => {
              this.setState({ isError: false });
            }}
            alertType={"error"}
          /> */}
        </div>
      );
    }
  }
);
