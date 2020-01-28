import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ComponentAbstract from "../../_abstract/c.abstract";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";

const useStyles = withStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 440
  },
  header: {
    borderTop: "1px solid rgb(250,250,250) !important",
    fontWeight: "bold"
  }
});

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768)
];

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: value => value.toLocaleString()
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: value => value.toLocaleString()
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: value => value.toFixed(2)
  },
  {
    id: "Date",
    label: "Date",
    minWidth: 170,
    align: "right"
  }
];

class ComponentCustomTable extends ComponentAbstract {
  static propTypes = {
    visible: PropTypes.bool,

    title: PropTypes.string,
    onClose: PropTypes.func,
    onClick: PropTypes.func,
    result: PropTypes.array
  };

  static defaultProps = {
    visible: false,

    title: "",
    onClose: () => {},
    onClick: () => {},
    result: []
  };

  /*
        ################################################################################################################################################
        ################################################################################################################################################
                constructor
        ################################################################################################################################################
        ################################################################################################################################################
    */
  constructor(props) {
    super(props);
    this.state = {
      rowsPerPage: 5,
      page: 0
    };
  }

  /*
		################################################################################################################################################
		################################################################################################################################################
				event
		################################################################################################################################################
		################################################################################################################################################
	*/
  onClose() {
    this.props.onClose();
  }

  /*
		################################################################################################################################################
		################################################################################################################################################
				render
		################################################################################################################################################
		################################################################################################################################################
	*/
  render() {
    const {
      props: { classes, result },
      state: { rowsPerPage, page }
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

    console.log("aasd", this.props);
    return (
      <TableContainer className={classes.container}>
        <div style={{ padding: 10 }}>Search Result</div>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className={classes.header}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
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
                    <TableCell align={"right"}>{item.creationDate}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                // rowsPerPageOptions={[]}   // prevent display dropdown option
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={5}
                count={rows.length}
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
    );
  }
}

export default useStyles(ComponentCustomTable);
