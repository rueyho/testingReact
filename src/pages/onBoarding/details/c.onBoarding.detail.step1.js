import React from "react";
import { connect } from "react-redux";

/* ################################################### */
/*          UI Framework         */
/* ################################################### */

import Grid from "@material-ui/core/Grid";

import { withStyles } from "@material-ui/core/styles";
import ComponentCustomButton from "../../_component/button/c.customButton";
import ComponentOnBoardingDoc from "../../onBoarding/c.onBoarding.document";
import ComponentOnBoardingBussInf from "../details/c.onBoarding.bussinessInf";
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
import { ReduxEnumBank } from "../../../_redux/action/reduxAction.bank";
/* ################################################### */
/* 		 util		 */
/* ################################################### */

/* ################################################### */
/*          style         */
/* ################################################### */

import { CardMedia } from "@material-ui/core";

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
        } else if (ReduxEnumBank.SEARCH_DONE === recordItem["type"]) {
          stateObj["onReadyFunction"] = "requestSearchDone";
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

class ComponentBankStep1 extends ComponentAbstract {
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
      form: {},
      data: {},
      result: [],
      rowsPerPage: 5,
      page: 0
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
      props: { classes }
    } = this;

    return (
      <div className={classes.root}>
        <Grid
          item
          xs={12}
          alignItems="baseline"
          container
          direction="row"
          justify="flex-start"
          className={classes.rowField}
        >
          <ComponentOnBoardingBussInf></ComponentOnBoardingBussInf>
        </Grid>

        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <ComponentCustomButton
            onClick={() => {
              this.props.onBack();
            }}
            backgroundColor={"#6a8669d9"}
            label={"Back"}
          ></ComponentCustomButton>
          <ComponentCustomButton
            onClick={() => {
              this.props.onNext();
            }}
            backgroundColor={"red"}
            label={"Next"}
          ></ComponentCustomButton>
        </div>
      </div>
    );
  }
}

export default reduxConnect(useStyles(ComponentBankStep1));
