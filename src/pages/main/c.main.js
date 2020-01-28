import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

/* ################################################## */
/*          UI Framework                              */
/* ################################################## */

/* ################################################### */
/* 		 redux		 */
/* ################################################### */
import ReduxActionGlobal, {
  ReduxEnumGlobal
} from "../../_redux/action/reduxAction.global";

/* ################################################### */
/* 		 component		 */
/* ################################################### */

// import ComponentCustomLoading from "../_component/loading/c.loading";
// import ComponentCustomLoadingLazy from "../_component/loading/c.loading.lazy";
// import ComponentCustomAlert from "../_component/alert/c.alert";

import ComponentCustomHeader from "../_component/header/c.header";
// import ComponentCustomFooter from "../_component/footer/c.footer";

/* ################################################### */
/* 		 page		 */
/* ################################################### */

import ComponentAbstract from "../_abstract/c.abstract";

/* ################################################### */
/* 		 util		 */
/* ################################################### */

import HelperNavigate, { HelperNavigateENUM } from "../_helper/h.navigate";
import HelperStorage from "../_helper/h.storage";
import HelperVerifyAuthorize from "../_helper/h.verifyAuthorize";

// import { ObjectUtil } from "../../_util/util.object";
import { StringUtil } from "../../_util/util.string";
import { DateUtil } from "../../_util/util.date";

/* ################################################### */
/* 		 style		 */
/* ################################################### */

import "../_style/s.app.css";
import "./s.main.css";

import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";

// import ServiceAuthorization from '../../_service/service/service.authorization'

const styles = theme => ({
  toolbar: theme.mixins.toolbar
});

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ff7961",
      main: "#c33336",
      dark: "#ba000d",
      contrastText: "#fff"
    },
    secondary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff"
    }
  },
  overrides: {
    MuiInput: {
      underline: {
        "&:before": {
          borderBottomColor: "rgb(0,0,0,0.25)"
        },
        "&:hover:not($disabled):before:not($focused):before:not($error):before": {
          borderBottomColor: "rgba(0,0,0,0.45)"
        }
      }
    },
    MuiButton: {
      label: {
        "& svg:first-child": {
          marginRight: 6
        },
        "& svg:last-child": {
          marginLeft: 6
        },
        "& svg:first-child:last-child": {
          marginLeft: 0,
          marginRight: 0
        }
      }
    },
    MuiTableHead: {
      root: {
        backgroundColor: "rgba(0,0,0,0.06)",
        "& th": {
          borderTop: "1px solid black",
          fontSize: "0.85rem"
        }
      }
    },
    MuiTableCell: {
      paddingDense: {
        paddingLeft: 16,
        paddingRight: 16,
        "&:last-child": {
          paddingRight: 16
        }
      }
    }
  }
});

const RouteSwitch = () => {
  return (
    <Switch>
      {(() => {
        let routeList = [];
        routeList.push(
          <Route
            key={"_RouteSwitch_000"}
            exact
            path={"/"}
            render={props => {
              return (
                <Redirect
                  to={{
                    pathname: HelperNavigate.mapPath(HelperNavigateENUM.LOGIN),
                    state: { from: props.location }
                  }}
                />
              );
            }}
          />
        );

        for (let i = 0; i < HelperNavigate.mapList().length; i++) {
          let tmpMapItem = HelperNavigate.mapList()[i];

          routeList.push(
            <Route
              key={"RouteSwitch" + i}
              exact
              path={tmpMapItem.path}
              component={tmpMapItem.component()}
            />
          );
        }

        return routeList;
      })()}
    </Switch>
  );
};

const UpdateRefreshToken = result => {
  console.log("UpdateRefreshToken : * : result => ", result);

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
    )
  ]).then(value => {
    console.log("UpdateRefreshToken : * : ############################  ");
    console.log("UpdateRefreshToken : * :  refresh successful  ");
    console.log("UpdateRefreshToken : * : ############################  ");
  });
};

export default connect((state, props) => {
  let thisState = state["ReduxGlobal"];
  let stateObj = {};

  if (thisState) {
    for (let i = 0; i < thisState.length; i++) {
      let recordItem = thisState[i];

      if (!recordItem["completed"]) {
        if (ReduxEnumGlobal.LOGIN_SUCCESS === recordItem["type"]) {
          stateObj["onReadyFunction"] = "rLoginSuccess";
        } else if (ReduxEnumGlobal.LOGOUT_SUCCESS === recordItem["type"]) {
          stateObj["onReadyFunction"] = "rLogoutSuccess";
        } else if (ReduxEnumGlobal.REFRESH_TOKEN_DONE === recordItem["type"]) {
          UpdateRefreshToken(recordItem["result"]);
        }

        recordItem["completed"] = true;
      }
    }
  }

  return stateObj;
})(
  withStyles(styles)(
    class ComponentMain extends ComponentAbstract {
      constructor(props) {
        super(props);

        this.state = {
          isLoading: false,
          isReady: false,
          hasLogin: false
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
        console.log("ComponentMain : _onReady mvp1.1: *");

        Promise.all([
          new HelperStorage().get(
            HelperStorage.ENUM.LOCAL,
            HelperStorage.KEY.LAST_REFRESH
          )
        ]).then(value => {
          let lastRefresh = value[0];

          console.log(
            "ComponentMain : _onReady : lastRefresh => ",
            lastRefresh
          );

          let needRefresh = false;

          if (StringUtil.isEmpty(lastRefresh)) {
            needRefresh = true;
          } else {
            try {
              let differentMinute = DateUtil.differentMinute(
                DateUtil.stringToDate(lastRefresh),
                DateUtil.currentDate()
              );

              console.log(
                "ComponentMain : _onReady : differentMinute => ",
                differentMinute
              );

              if (differentMinute > 5) {
                needRefresh = true;
              }
            } catch (e) {
              console.log("ComponentMain : _onReady : [EXCEPTION] , ", e);
            }
          }

          console.log(
            "ComponentMain : _onReady : needRefresh => ",
            needRefresh
          );

          if (needRefresh) {
            Promise.all([
              new HelperStorage().set(
                HelperStorage.ENUM.LOCAL,
                HelperStorage.KEY.LAST_REFRESH,
                DateUtil.formatDateTimeStick(DateUtil.currentDate())
              )
            ]).then(value => {
              window.location.reload(true);
            });
          } else {
            console.log("isReady main");
            this.setState(
              {
                isReady: true,
                isLoading: true
              },
              () => {
                Promise.all([
                  new HelperStorage().exist(
                    HelperStorage.ENUM.SESSION,
                    HelperStorage.KEY.AUTHORIZATION_ACCESS_TOKEN
                  ),
                  new HelperStorage().exist(
                    HelperStorage.ENUM.SESSION,
                    HelperStorage.KEY.AUTHORIZATION_REFRESH_TOKEN
                  )
                ]).then(value => {
                  console.log("ComponentMain : _onReady : [RESULT] => ", value);

                  let hasToken = false;
                  for (let i = 0; i < value.length; i++) {
                    if (value[i]) {
                      hasToken = true;
                    }
                  }

                  if (
                    hasToken &&
                    HelperNavigate.historyObj().location.pathname !==
                      HelperNavigate.mapPath(HelperNavigateENUM.LOGOUT)
                  ) {
                    HelperVerifyAuthorize.verify()
                      .then(() => {
                        this.rLoginSuccess();
                        HelperNavigate.route(
                          HelperNavigate.mapPath(HelperNavigateENUM.HOME)
                        );
                      })
                      .catch(error => {
                        this.rLogoutSuccess();

                        Promise.all([new HelperStorage().clearAll()]).then(
                          () => {
                            console.log(
                              "ComponentMain : _onReady : [isReady - clean storage] : * "
                            );

                            HelperNavigate.route(
                              HelperNavigate.mapPath(HelperNavigateENUM.LOGIN)
                            );
                          }
                        );
                      });
                  } else {
                    this.rLogoutSuccess();

                    Promise.all([new HelperStorage().clearAll()]).then(() => {
                      console.log(
                        "ComponentMain : _onReady : [isReady - clean storage] : * "
                      );

                      HelperNavigate.route(
                        HelperNavigate.mapPath(HelperNavigateENUM.LOGIN)
                      );
                    });
                  }
                });
              }
            );
          }
        });
      }

      rLoginSuccess() {
        console.log("ComponentMain : rLoginSuccess : * ");

        this.setState({ isLoading: false, hasLogin: true });

        this.dispatch(ReduxActionGlobal.rRequestEnd());
      }

      rLogoutSuccess() {
        console.log("ComponentMain : rLogoutSuccess : ******** ");
        console.log("ComponentMain : rLogoutSuccess : [DONE] ");
        console.log("ComponentMain : rLogoutSuccess : ******** ");

        try {
          clearInterval(this._timer);
        } catch (e) {}

        this.setState({ isLoading: false, hasLogin: false }, () => {
          // if (!HelperNavigate.isCurrentPath(HelperNavigateENUM.LOGOUT)) {
          //   HelperNavigate.route(
          //     HelperNavigate.mapPath(HelperNavigateENUM.LOGOUT)
          //   );
          // }
          HelperNavigate.route(
            HelperNavigate.mapPath(HelperNavigateENUM.LOGIN)
          );
        });

        // this.dispatch(ReduxActionGlobalMenu.rHideMenu());
        this.dispatch(ReduxActionGlobal.rRequestEnd());
      }

      /*
        		################################################################################################################################################
        		################################################################################################################################################
        				event
        		################################################################################################################################################
        		################################################################################################################################################
			*/

      _triggerKickMode() {
        this.setState({ isIdle: false }, () => {
          try {
            HelperNavigate.route(
              HelperNavigate.mapPath(HelperNavigateENUM.LOGOUT)
            );
          } catch (e) {}
        });
      }

      /*
				################################################################################################################################################
				################################################################################################################################################
						request
				################################################################################################################################################
				################################################################################################################################################
			*/

      /* #################### Render #################### */
      render() {
        //#region THIS
        const {
          state: { isReady, hasLogin }
        } = this;
        //#endregion THIS
        return (
          <Router history={HelperNavigate.historyObj()}>
            <MuiThemeProvider theme={theme}>
              <div
                ref={refs => {
                  this._mainBody = refs;
                }}
                onMouseMove={() => {}}
                onClick={() => {
                  console.log("ComponentMain : render : onClick : * ");
                  this._idleCount = 0;
                }}
                className={"main-container"}
              >
                {/* Header */}
                {isReady && <ComponentCustomHeader hasLogin={hasLogin} />}

                {/* Content */}

                <div className={"main-container-wrapper"}>
                  <div className={"main-content"}>
                    <div className={"main-content-wrapper"}>
                      <RouteSwitch />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                {/* {isReady && <ComponentCustomFooter />} */}

                {/* <ComponentCustomLoading visible={isLoading} /> */}
              </div>
            </MuiThemeProvider>
          </Router>
        );
      }
    }
  )
);
