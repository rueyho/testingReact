import React from "react";
import { connect } from "react-redux";

/* ################################################### */
/*          UI Framework         */
/* ################################################### */
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";

/* ################################################### */
/*          redux         */
/* ################################################### */
import ReduxActionLogin, {
  ReduxEnumLogin
} from "../../_redux/action/reduxAction.login";
import ReduxActionGlobal from "../../_redux/action/reduxAction.global";

/* ################################################### */
/*          constant         */
/* ################################################### */
import { AppConstant } from "../../_constant/constant.app";

/* ################################################### */
/*          page         */
/* ################################################### */

import ComponentAbstract from "../_abstract/c.abstract";
import HelperNavigate, { HelperNavigateENUM } from "../_helper/h.navigate";
import HelperStorage from "../_helper/h.storage";
import HelperAuthority from "../_helper/h.authority";

/* ################################################### */
/* 		 util		 */
/* ################################################### */

import TokenUtil from "../../_util/util.token";
// import { ArrayUtil } from "../../_util/util.array";
import { DateUtil } from "../../_util/util.date";
// import { ObjectUtil } from "../../_util/util.object";
/* ################################################### */
/*          style         */
/* ################################################### */

import "./c.login.css";
import LoginBg from "../../img/bg-login.jpeg";

const useStyles = withStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  card: {
    maxWidth: 275
  },
  title: {
    fontSize: 14
  },
  buttonLogin: {
    padding: 10
  },
  alink: {
    color: "black"
  },
  formWrapper: {
    width: "80%",
    margin: "auto",
    borderRadius: "50px",
    display: "grid",
    gridGap: "5vw"
  },
  formRight: {
    display: "grid",
    gridGap: "20px",
    padding: "10% 5%"
  },
  formLeft: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    height: "100vh",
    background: "#6f686814"
  },
  titleStyle: {
    fontFamily: "Times New Roman, serif",
    fontWeight: "bold"
  }
}));

const StyledButton = withStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  },
  label: {
    textTransform: "capitalize"
  }
})(Button);

const reduxConnect = connect((state, ownProps) => {
  let thisState = state["ReduxLogin"];
  let stateObj = {};

  if (thisState) {
    for (let i = 0; i < thisState.length; i++) {
      let recordItem = thisState[i];
      if (!recordItem["completed"]) {
        if (ReduxEnumLogin.INIT_DONE === recordItem["type"]) {
          stateObj["onReadyFunction"] = "requestInitDone";
          stateObj["_result_"] = recordItem["_result_"];
        } else if (ReduxEnumLogin.LOGIN_DONE === recordItem["type"]) {
          stateObj["onReadyFunction"] = "requestLoginDone";
          stateObj["_result_"] = recordItem["_result_"];
        } else if (ReduxEnumLogin.CRYPTO_DONE === recordItem["type"]) {
          stateObj["onReadyFunction"] = "requestCryptoDone";
          stateObj["_result_"] = recordItem["_result_"];
        } else if (ReduxEnumLogin.ERROR === recordItem["type"]) {
          stateObj["onReadyFunction"] = "requestError";
          stateObj["_result_"] = recordItem["_result_"];
        }
        recordItem["completed"] = true;
      }
    }
  }

  return stateObj;
});

class ComponentLogin extends ComponentAbstract {
  constructor(props) {
    super(props);

    console.log(
      "ComponentLogin : constructor : *** : [" + this.uuid() + "] ",
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
        loginId: "",
        loginPass: ""
      },
      data: {}
    };
  }

  /*
                ################################################################################################################################################
                ################################################################################################################################################
                        listener
                ################################################################################################################################################
                ################################################################################################################################################
            */
  _onReady() {}

  /*
                ################################################################################################################################################
                ################################################################################################################################################
                        event
                ################################################################################################################################################
                ################################################################################################################################################
            */
  onChangeField(e) {
    let form = this.state.form;
    form[e.target.id] = e.target.value;
    this.setState({ form: form });
  }
  onTogglePasswordView() {
    this.setState({
      isAbleViewPass: !this.state.isAbleViewPass
    });
  }

  requestLogin() {
    console.log("ComponentLogin : requestLogin : *** ");
    console.log("ComponentLogin : requestLogin : [DATA] => ", this.state.form);

    this.setState({ isLoading: true }, () => {
      this.dispatch(
        ReduxActionLogin.rLogin(
          {},
          {
            loginId: this.state.form.loginId,
            loginPass: encodeURIComponent(this.state.form.loginPass)
          }
        )
      );
    });
  }

  requestLoginDone(result) {
    console.log("ComponentLogin : requestLoginDone : => ", result);

    Promise.all([
      new HelperStorage().set(
        HelperStorage.ENUM.SESSION,
        HelperStorage.KEY.IS_LOGIN,
        "login"
      ),
      new HelperStorage().set(
        HelperStorage.ENUM.SESSION,
        HelperStorage.KEY.AUTHORIZATION_ACCESS_TOKEN,
        result["access_token"]
      ),
      new HelperStorage().set(
        HelperStorage.ENUM.SESSION,
        HelperStorage.KEY.AUTHORIZATION_REFRESH_TOKEN,
        result["refresh_token"]
      ),
      new HelperStorage().set(
        HelperStorage.ENUM.SESSION,
        HelperStorage.KEY.AUTHORIZATION_TOKEN_TYPE,
        result["token_type"]
      ),
      new HelperStorage().set(
        HelperStorage.ENUM.SESSION,
        HelperStorage.KEY.AUTHORIZATION_EXPIRED_IN,
        result["expires_in"]
      ),
      new HelperStorage().set(
        HelperStorage.ENUM.SESSION,
        HelperStorage.KEY.AUTHORIZATION_DATE,
        DateUtil.formatDateTimeStick(DateUtil.currentDate())
      ),
      new HelperStorage().set(
        HelperStorage.ENUM.SESSION,
        HelperStorage.KEY.AUTHORIZATION_LOGIN_ID,
        this.state.form.loginId
      ),
      new HelperStorage().set(
        HelperStorage.ENUM.SESSION,
        HelperStorage.KEY.USERNAME,
        result["name"]
      )
    ]).then(() => {
      Promise.all([
        new HelperStorage().get(
          HelperStorage.ENUM.SESSION,
          HelperStorage.KEY.IS_LOGIN
        ),
        new HelperStorage().get(
          HelperStorage.ENUM.SESSION,
          HelperStorage.KEY.AUTHORIZATION_ACCESS_TOKEN
        ),
        new HelperStorage().get(
          HelperStorage.ENUM.SESSION,
          HelperStorage.KEY.AUTHORIZATION_REFRESH_TOKEN
        ),
        new HelperStorage().get(
          HelperStorage.ENUM.SESSION,
          HelperStorage.KEY.AUTHORIZATION_TOKEN_TYPE
        ),
        new HelperStorage().get(
          HelperStorage.ENUM.SESSION,
          HelperStorage.KEY.AUTHORIZATION_EXPIRED_IN
        ),
        new HelperStorage().get(
          HelperStorage.ENUM.SESSION,
          HelperStorage.KEY.AUTHORIZATION_LOGIN_ID
        )
      ]).then(value => {
        console.log("ComponentLogin : requestLoginDone: [SAVE] => ", value);

        let authority = [];

        if (AppConstant.isDebug()) {
          authority = [];
        } else {
          let tokenObj = TokenUtil.decode(value[1]);
          console.log(
            "ComponentLogin : requestLoginDone: [SAVE - TOKEN OBJECT] => ",
            tokenObj
          );
          authority = tokenObj["authorities"];
        }

        console.log(
          "ComponentLogin : requestLoginDone: [SAVE - TOKEN OBJECT] : authority => ",
          authority
        );
        new HelperAuthority()
          .load(authority)
          .then(() => {
            this.setState({ isLoading: false }, () => {
              this.dispatch(ReduxActionGlobal.rLoginSuccess());
              HelperNavigate.route(
                HelperNavigate.mapPath(HelperNavigateENUM.BANK)
              );
            });
          })
          .catch(e => {
            this.setState({ isLoading: false });
            console.log(
              "ComponentLogin : requestLoginDone: [SAVE] : [EXCEPTION] , ",
              e
            );
          });
      });
    });

    this.dispatch(ReduxActionLogin.rRequestEnd());
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
      <div className={classes.formContainer}>
        <Card className={classes.formWrapper}>
          <Grid container>
            <Grid
              className={classes.formRight}
              xs={6}
              fluid
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ width: "100%", backgroundColor: "white" }}
            >
              <div className={classes.titleStyle}>Welcome to Simplrx</div>
              <TextField
                className={classes.margin}
                label={"Username"}
                id="input-with-icon-textfield"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                className={classes.margin}
                label={"Password"}
                id="input-with-icon-textfield"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  )
                }}
              />
              <div className={classes.buttonLogin}>
                <StyledButton
                  style={{ width: "220px" }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.requestLogin();
                  }}
                >
                  Login
                </StyledButton>
              </div>
              <div style={{ textAlign: "center" }}>
                <Link
                  // className={classes.alink}
                  component="button"
                  variant="body2"
                  onClick={() => {
                    console.info("I'm a button.");
                  }}
                >
                  Forgot Username/ Password?
                </Link>
              </div>
            </Grid>

            <Grid
              xs={6}
              fluid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <img
                src={LoginBg}
                style={{ width: "100%", height: "100%" }}
                alt="login"
              />
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}

export default reduxConnect(useStyles(ComponentLogin));
