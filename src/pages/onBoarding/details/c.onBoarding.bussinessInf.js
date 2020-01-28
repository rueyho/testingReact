import React from "react";
import { connect } from "react-redux";

/* ################################################### */
/*          UI Framework         */
/* ################################################### */

import Grid from "@material-ui/core/Grid";

import { withStyles } from "@material-ui/core/styles";

import ComponentCustomLoading from "../../_component/loading/c.loading";

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
import PropTypes from "prop-types";
import ComponentAbstract from "../../_abstract/c.abstract";
import ReduxActionBank, {
  ReduxEnumBank
} from "../../../_redux/action/reduxAction.bank";
import reduxActionBank from "../../../_redux/action/reduxAction.bank";
import HelperNavigate, { HelperNavigateENUM } from "../../_helper/h.navigate";
import FormValidateUtil from "../../../_util/util.formValidate";
/* ################################################### */
/* 		 util		 */
/* ################################################### */
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

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

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

class ComponentOnBoardingBussInf extends ComponentAbstract {
  constructor(props) {
    super(props);

    console.log(
      "ComponentOnBoardingBussInf : constructor : *** : [" + this.uuid() + "] ",
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
      step: 0,
      slideIndex: 0
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
    console.log("ComponentOnBoardingBussInf requestPreview");

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
        userType: {
          required: true,
          exactlength: 6,
          number: true,
          fieldName: "Tac No."
        },
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

  handleChange = (event, value) => {
    console.log("handleChange", value);
    this.setState({
      slideIndex: value
    });
  };
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
      state: { slideIndex, form, step }
    } = this;

    return (
      <div className={classes.root}>
        <Grid container className={classes.wrapper}>
          <ComponentCustomLoading visible={this.state.isLoading} />
          <AppBar position="static">
            <Tabs
              variant="fullWidth"
              value={slideIndex}
              onChange={this.handleChange}
              aria-label="nav tabs example"
            >
              <LinkTab label="Page One" />
              <LinkTab label="Page Two" />
              <LinkTab label="Page Three" />
            </Tabs>
          </AppBar>
          <TabPanel value={slideIndex} index={0}>
            Page One
          </TabPanel>
          <TabPanel value={slideIndex} index={1}>
            Page Two
          </TabPanel>
          <TabPanel value={slideIndex} index={2}>
            Page Three
          </TabPanel>
        </Grid>
      </div>
    );
  }
}

export default reduxConnect(useStyles(ComponentOnBoardingBussInf));
