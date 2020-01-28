import React from "react";
import { connect } from "react-redux";

/* ################################################### */
/*          UI Framework         */
/* ################################################### */

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import ComponentCustomButton from "../_component/button/c.customButton";
import ComponentCustomLoading from "../_component/loading/c.loading";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";

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

import ComponentAbstract from "../_abstract/c.abstract";
import HelperNavigate, { HelperNavigateENUM } from "../_helper/h.navigate";
import HelperStorage from "../_helper/h.storage";
import HelperVerifyAuthorize from "../_helper/h.verifyAuthorize";
import ReduxActionBank, {
  ReduxEnumBank
} from "../../_redux/action/reduxAction.bank";
/* ################################################### */
/* 		 util		 */
/* ################################################### */

/* ################################################### */
/*          style         */
/* ################################################### */

import TextField from "@material-ui/core/TextField";

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
  //Table
  tableContainer: {
    maxHeight: 440
  },
  tableHeader: {
    borderTop: "1px solid rgb(250,250,250) !important",
    fontWeight: "bold",
    minWidth: 170
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
    this.requestSearch();
  }

  onClickReset() {
    console.log("ComponentBank onClickReset");
    // let form = this.state.form;
    // form["userType"] = "";

    this.setState(
      {
        // form
        form: {
          ...this.state.form,
          userID: "",
          userType: "",
          role: "",
          status: "",
          branch: ""
        }
      },
      () => {
        console.log("aaaaaa", this.state.form);
      }
    );
  }

  onClickSearch() {
    console.log("ComponentBank onClickSearchx");
    this.requestSearch();
  }
  onClickAddNew() {
    console.log("ComponentBank onClickAddNew");
    HelperNavigate.route(
      HelperNavigate.mapPath(HelperNavigateENUM.BANK_DETAIL)
    );
  }

  requestSearch() {
    console.log("ComponentBank requestSearch");

    this.setState({ isLoading: true }, () => {
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
            this.dispatch(
              ReduxActionBank.rSearch(
                { authorizeType: value[0], authorizeToken: value[1] },
                {}
              )
            );
          });
        })
        .catch(error => {
          this.requestError(error);
        });
    });
  }

  requestSearchDone(result) {
    console.log(
      "ComponentBank : requestSearchDone : ***  : result => ",
      result
    );

    this.setState({
      isLoading: false,
      result: result.bankusers,
      ElementNum: result.totalElement
    });

    this.dispatch(ReduxActionBank.rRequestEnd());
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
      props: { classes },
      state: { form, rowsPerPage, page, result }
    } = this;

    const handleChangePage = (event, newPage) => {
      console.log("handleChangePage", newPage + event);
      this.setState({
        page: newPage
      });
    };

    const handleChangeRowsPerPage = event => {
      console.log("handleChangeRowsPerPage", event);
      this.setState({
        rowsPerPage: parseInt(event.target.value, 10),
        page: 0
      });
    };

    return (
      <div className={classes.root}>
        <Grid container className={classes.wrapper}>
          <ComponentCustomLoading visible={this.state.isLoading} />
          <Paper className={classes.paper}>
            <div className={classes.header}>Bank User</div>
            <div style={{ padding: 15 }}>
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
                <TextField
                  className={classes.textField}
                  id="userType"
                  value={form.userType}
                  variant="outlined"
                  size="small"
                  onChange={e => {
                    this.onChangeField(e);
                  }}
                />

                <div className={classes.label}>Branch</div>
                <TextField
                  className={classes.textField}
                  id="branch"
                  value={form.branch}
                  variant="outlined"
                  size="small"
                  onChange={e => {
                    this.onChangeField(e);
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
                <div className={classes.label}>User ID</div>
                <TextField
                  className={classes.textField}
                  id="userID"
                  value={form.userID}
                  variant="outlined"
                  size="small"
                  onChange={e => {
                    this.onChangeField(e);
                  }}
                />

                <div className={classes.label}>Status</div>
                <TextField
                  className={classes.textField}
                  id="status"
                  value={form.status}
                  variant="outlined"
                  size="small"
                  onChange={e => {
                    this.onChangeField(e);
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
                    this.onClickReset();
                  }}
                  backgroundColor={"#6a8669d9"}
                  label={"Reset"}
                ></ComponentCustomButton>
                <ComponentCustomButton
                  onClick={() => {
                    this.onClickSearch();
                  }}
                  backgroundColor={"#12a20cd9"}
                  label={"Search"}
                ></ComponentCustomButton>
                <ComponentCustomButton
                  onClick={() => {
                    this.onClickAddNew();
                  }}
                  backgroundColor={"red"}
                  label={"Add"}
                ></ComponentCustomButton>
              </div>
            </div>
          </Paper>
        </Grid>

        {/* //Table #########################################// */}
        <Grid container className={classes.wrapper}>
          <Paper className={classes.paper}>
            <TableContainer className={classes.container}>
              <div style={{ padding: 10 }}>Search Result</div>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      // key={column.id}
                      align={"right"}
                      className={classes.tableHeader}
                    >
                      User ID
                    </TableCell>
                    <TableCell
                      // key={column.id}
                      align={"right"}
                      className={classes.tableHeader}
                    >
                      User Name
                    </TableCell>
                    <TableCell
                      // key={column.id}
                      align={"right"}
                      className={classes.tableHeader}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      // key={column.id}
                      align={"right"}
                      className={classes.tableHeader}
                    >
                      Role
                    </TableCell>
                    <TableCell
                      // key={column.id}
                      align={"right"}
                      className={classes.tableHeader}
                    >
                      Branch
                    </TableCell>
                    <TableCell
                      // key={column.id}
                      align={"right"}
                      className={classes.tableHeader}
                    >
                      Created Date/Time
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {result
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(item => {
                      return (
                        //key={row.code} better don't set ,code must unique , if not will get error pages
                        <TableRow hover role="checkbox" tabIndex={-1}>
                          <TableCell align={"right"}>{item.username}</TableCell>
                          <TableCell align={"right"}>{item.name}</TableCell>
                          <TableCell align={"right"}>{item.status}</TableCell>
                          <TableCell align={"right"}>{item.persona}</TableCell>
                          <TableCell
                            align={"right"}
                          >{`${item.branchCode}-${item.branchName}`}</TableCell>
                          <TableCell align={"right"}>
                            {item.creationDate}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      // rowsPerPageOptions={[]}   // prevent display dropdown option
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 }
                      ]}
                      colSpan={6}
                      count={result.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      // labelRowsPerPage="" //prevent display rows per page text
                      SelectProps={{
                        inputProps: { "aria-label": "rows per page" },
                        native: true
                      }}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                      // ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </div>
    );
  }
}

export default reduxConnect(useStyles(ComponentBank));
