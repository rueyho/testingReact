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
/* ################################################### */
/* 		 util		 */
/* ################################################### */

/* ################################################### */
/*          style         */
/* ################################################### */

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

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
      props: { classes, form, formValidation }
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
          <div className={classes.label}>User Type</div>
          <FormControl className={classes.selectField}>
            <Select
              id="userType"
              value={form.userType}
              onChange={e => {
                this.props.onChangeForm("userType", e.target.value);
              }}
              input={<BootstrapInput />}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid
          item
          xs={12}
          alignItems="baseline"
          container
          direction="row"
          justify="flex-start"
          className={classes.rowField}
        >
          <div className={classes.label}>User ID</div>
          <TextField
            error={formValidation !== ""}
            helperText={formValidation && formValidation.userID}
            className={classes.textField}
            id="userID"
            value={form.userID}
            variant="outlined"
            size="small"
            onChange={e => {
              this.props.onChangeForm("userID", e.target.value);
            }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          alignItems="baseline"
          container
          direction="row"
          justify="flex-start"
          className={classes.rowField}
        >
          <div className={classes.label}>Role</div>
          <TextField
            className={classes.textField}
            id="role"
            value={form.role}
            variant="outlined"
            size="small"
            onChange={e => {
              this.onChangeField(e);
            }}
          />
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
