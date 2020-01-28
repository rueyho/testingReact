import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
/* ################################################## */
/*          UI Framework                              */
/* ################################################## */
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import LogoutIcon from "@material-ui/icons/ExitToApp";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

/* ################################################## */
/*          Page                                      */
/* ################################################## */
// import ComponentAbstract from "../../_abstract/c.abstract";
import { CommonComponent } from "../../_abstract/c.common";
import ReduxActionGlobal from "../../../_redux/action/reduxAction.global";
import HelperStorage from "../../_helper/h.storage";
import HelperNavigate, { HelperNavigateENUM } from "../../_helper/h.navigate";

/* ################################################### */
/*          Style                                       */
/* ################################################### */
import "../../_style/s.app.css";

const styles = withStyles(theme => ({
  list: {
    width: 250
  },
  fullList: {
    width: 280,
    position: "fixed",
    zIndex: 10,
    background: "#c33336",
    height: "100%",
    padding: 15,
    color: "white",
    marginTop: 64
  }
}));

const arraySide = [
  {
    title: "OnBoarding",
    route: "ONBOARDING"
  },
  {
    title: "Bank User",
    route: "BANK"
  }
];

const reduxConnect = connect((state, props) => {
  let thisState = [...state["ReduxGlobal"]],
    stateObj = {};
  if (thisState) {
    for (let i = 0; i < thisState.length; i++) {
      let recordItem = thisState[i];
      if (!recordItem["completed"]) {
        switch (recordItem["type"]) {
          // case ReduxEnumGlobalHead.SHOW_MENU:
          //   stateObj["onReadyFunction"] = "showMenuButton";
          //   break;
          // case ReduxEnumGlobalHead.HIDE_MENU:
          //   stateObj["onReadyFunction"] = "hideMenuButton";
          //   break;
          default:
            break;
        }
        stateObj["_result_"] = recordItem["_result_"];
        recordItem["completed"] = true;
      }
    }
  }
  return stateObj;
});
class ComponentCustomHeader extends CommonComponent {
  static propTypes = {
    hasLogin: PropTypes.bool,
    toggleDrawer: PropTypes.bool
  };
  static defaultProps = {
    hasLogin: false,
    toggleDrawer: false
  };

  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      loginId: "",
      closed: true,
      menuId: 0,
      toggleDrawer: false
    };
  }

  onClickLogout = () => {
    this.setState(
      {
        closed: true
      },
      () => {
        this.dispatch(ReduxActionGlobal.rLogoutSuccess());
      }
    );
  };

  /* #################### Render #################### */
  render() {
    //#region THIS
    const {
      props: { hasLogin, classes },
      state: { toggleDrawer }
    } = this;
    //#endregion

    const openDrawer = (side, action) => event => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }

      console.log("toggleDrawer", action);
      this.setState({
        toggleDrawer: side === "button" ? !toggleDrawer : action
      });
    };

    return (
      hasLogin && [
        toggleDrawer && (
          <div
            className={classes.fullList}
            role="presentation"
            onClick={openDrawer("side", false)}
            onKeyDown={openDrawer("side", false)}
          >
            <List>
              {arraySide.map((item, index) => (
                <ListItem
                  button
                  key={item.title}
                  onClick={() => {
                    HelperNavigate.route(
                      HelperNavigate.mapPath(HelperNavigateENUM[item.route])
                    );
                  }}
                >
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {["All mail", "Trash", "Spam"].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </div>
        ),
        <AppBar position="relative">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon onClick={openDrawer("button", true)} />
            </IconButton>

            <Typography variant="h6" className={classes.title}>
              Simplr Project
            </Typography>
            {/* <div style={{ float: "right" }}> */}
            <LogoutIcon
              style={{ padding: "10px 10px" }}
              onClick={this.onClickLogout}
            ></LogoutIcon>
            <Typography variant="h6" className={classes.title}>
              Welcome , {this.getStorage(HelperStorage.KEY.USERNAME)}
            </Typography>
            {/* </div> */}
            {/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
      ]
    );
  }
}

export default reduxConnect(styles(ComponentCustomHeader));
