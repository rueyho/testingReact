import React from "react";
import { connect } from "react-redux";

/* ################################################### */
/*          UI Framework         */
/* ################################################### */

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import ComponentCustomButton from "../../_component/button/c.customButton";
import ComponentCustomLoading from "../../_component/loading/c.loading";
import ComponentCustomStepper from "../../_component/stepper/c.customStepper";
import ComponentBankStep1 from "../../../pages/bank/details/c.bank.detail.step1";
import ComponentBankStep2 from "../../../pages/bank/details/c.bank.detail.step2";
import ComponentBankStep3 from "../../../pages/bank/details/c.bank.detail.step3";

/* ################################################### */
/*          redux         */
/* ################################################### */

/* ################################################### */
/*          constant         */
/* ################################################### */
// import { AppConstant } from '../../_constant/constant.app';

/* ################################################### */
/*          page         */
/* ################################################### */

import ComponentAbstract from "../../_abstract/c.abstract";
import HelperStorage from "../../_helper/h.storage";
import HelperVerifyAuthorize from "../../_helper/h.verifyAuthorize";
import ReduxActionBank, {
  ReduxEnumBank
} from "../../../_redux/action/reduxAction.bank";
import reduxActionBank from "../../../_redux/action/reduxAction.bank";
import HelperNavigate, { HelperNavigateENUM } from "../../_helper/h.navigate";
import FormValidateUtil from "../../../_util/util.formValidate";
/* ################################################### */
/* 		 util		 */
/* ################################################### */

/* ################################################### */
/*          style         */
/* ################################################### */

const useStyles = withStyles(theme => ({
  root: {
    flexGrow: 1
  },
  wrapper: {
    padding: 15
  },
  paper: {
    width: "100%",
    // padding: theme.spacing(2),
    color: theme.palette.text.secondary
    // webkitBoxShadow: "-1px 4px 12px -1px rgba(147,156,147,1)",
    // mozBoxShadow: " -1px 4px 12px -1px rgba(147,156,147,1)",
    // boxShadow: "-1px 4px 12px -1px rgba(147,156,147,1)"
  },
  rowField: {
    padding: theme.spacing(1)
  },
  label: {
    flexBasis: "20%"
  },
  textField: {
    flexBasis: "25%",
    marginRight: 40
  },
  header: {
    padding: "15px",
    borderBottom: "1px solid #eee",
    fontWeight: 500,
    fontSize: 20
  },
  body: {
    padding: "15px"
  },
  selectField: {
    flexBasis: "25%"
  }
}));

const reduxConnect = connect((state, ownProps) => {
  let thisState = state["ReduxBank"];
  let stateObj = {};

  if (thisState) {
    for (let i = 0; i < thisState.length; i++) {
      let recordItem = thisState[i];
      if (!recordItem["completed"]) {
        if (ReduxEnumBank.INIT_DONE === recordItem["type"]) {
          stateObj["onReadyFunction"] = "requestInitDone";
          stateObj["_result_"] = recordItem["_result_"];
        } else if (ReduxEnumBank.SUBMIT_DONE === recordItem["type"]) {
          stateObj["onReadyFunction"] = "requestSubmitDone";
          stateObj["_result_"] = recordItem["_result_"];
        } else if (ReduxEnumBank.ERROR === recordItem["type"]) {
          stateObj["onReadyFunction"] = "requestError";
          stateObj["_result_"] = recordItem["_result_"];
        }
        recordItem["completed"] = true;
      }
    }
  }

  return stateObj;
});

class ComponentBank extends ComponentAbstract {
  constructor(props) {
    super(props);

    console.log(
      "ComponentBank : constructor : *** : [" + this.uuid() + "] ",
      props
    );

    this.state = {
      isLoading: false,
      isSubmit: false,
      isError: false,
      errorTitle: "",
      errorMsg: "",
      errorCode: "",
      form: {
        userType: "",
        userID: "",
        role: ""
      },
      data: {},
      result: [],
      step: 0
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
    // this.requestSearch();
  }

  /*
                ################################################################################################################################################
                ################################################################################################################################################
                        event
                ################################################################################################################################################
                ################################################################################################################################################
            */
  onChangeField(e) {
    console.log("onChangeField", e.target.value);
    let form = this.state.form;
    form[e.target.id] = e.target.value;
    this.setState({ form: form });
  }

  requestPreview() {
    console.log("ComponentBank requestPreview");

    this.setState({
      step: 2
    });
  }

  verifySubmit() {
    let form = this.state.form;

    FormValidateUtil.validate(
      {
        userType: form.userType,
        userID: form.userID
        // role: form.role
      },
      {
        // userType: {
        //   required: true,
        //   exactlength: 6,
        //   number: true,
        //   fieldName: "Tac No."
        // },
        userID: {
          required: true,
          exactlength: 6,
          number: true,
          fieldName: "User ID."
        }
        // role: {
        //   required: true,
        //   exactlength: 6,
        //   number: true,
        //   fieldName: "Role."
        // }
      }
    )
      .then(() => {
        this.setState(
          {
            formValidation: {}
          },
          () => {
            this.requestSubmit();
          }
        );
      })
      .catch(res => {
        this.setState({ formValidation: res });
        console.log("asdds", this.state.formValidation);
      });
  }

  requestSubmit() {
    console.log("ComponentBank requestSubmit");

    HelperVerifyAuthorize.verify()
      .then(() => {
        Promise.all([
          new HelperStorage().get(
            HelperStorage.ENUM.SESSION,
            HelperStorage.KEY.AUTHORIZATION_TOKEN_TYPE
          ),
          new HelperStorage().get(
            HelperStorage.ENUM.SESSION,
            HelperStorage.KEY.AUTHORIZATION_ACCESS_TOKEN
          )
        ]).then(value => {
          this.setState({ isLoading: true }, () => {
            this.dispatch(
              reduxActionBank.rSubmit(
                { authorizeType: value[0], authorizeToken: value[1] },
                {
                  userType: this.state.form.userType,
                  userID: this.state.form.userID,
                  role: this.state.form.role
                }
              )
            );
          });
        });
      })
      .catch(error => {
        this.requestError(error);
      });
  }

  requestSubmitDone(result) {
    console.log("ComponentBank requestSubmit", result);

    this.setState({
      result: result.bankusers,
      step: 1,
      isLoading: false
    });
  }
  /*
                ################################################################################################################################################
                ################################################################################################################################################
                        Request
                ################################################################################################################################################
                ################################################################################################################################################
            */

  /*
                ################################################################################################################################################
                ################################################################################################################################################
                        Util
                ################################################################################################################################################
                ################################################################################################################################################
            */

  /*
                ################################################################################################################################################
                ################################################################################################################################################
                        render
                ################################################################################################################################################
                ################################################################################################################################################
            */

  render() {
    const {
      props: { classes },
      state: { form, step, result }
    } = this;

    return (
      <div className={classes.root}>
        <Grid container className={classes.wrapper}>
          <ComponentCustomLoading visible={this.state.isLoading} />
          <Paper className={classes.paper}>
            <ComponentCustomStepper
              title={"Bank User - Add New User"}
              step={step}
            ></ComponentCustomStepper>

            {step === 0 && (
              <div style={{ padding: 15 }}>
                <ComponentBankStep1
                  formValidation={this.state.formValidation}
                  form={form}
                  onChangeForm={(key, value) => {
                    console.log("", key + value);
                    let form = this.state.form;
                    form[key] = value;
                    this.setState({ form: form });
                  }}
                  onNext={() => {
                    this.verifySubmit();
                  }}
                  onBack={() => {
                    this.props.history.goBack();
                  }}
                ></ComponentBankStep1>
              </div>
            )}

            {step === 1 && (
              <div style={{ padding: 15 }}>
                <ComponentBankStep2
                  result={result}
                  onNext={() => {
                    this.requestPreview();
                  }}
                  onBack={() => {
                    this.setState({
                      step: 0
                    });
                  }}
                ></ComponentBankStep2>
              </div>
            )}

            {step === 2 && (
              <div style={{ padding: 15 }}>
                <ComponentBankStep3
                  result={result}
                  onNext={() => {
                    HelperNavigate.route(
                      HelperNavigate.mapPath(HelperNavigateENUM.BANK)
                    );
                  }}
                ></ComponentBankStep3>
              </div>
            )}
          </Paper>
        </Grid>
      </div>
    );
  }
}

export default reduxConnect(useStyles(ComponentBank));
