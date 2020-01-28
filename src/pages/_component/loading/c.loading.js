import React from "react";
import PropTypes from "prop-types";

/* ################################################## */
/*          UI Framework                              */
/* ################################################## */
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

/* ################################################## */
/*          Page                                      */
/* ################################################## */
import ComponentAbstract from "../../_abstract/c.abstract";

const styles = theme => ({
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[5],
    padding: 15,
    borderRadius: "50%",
    outline: "none"
  }
});

class ComponentCustomLoading extends ComponentAbstract {
  static propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func
  };
  static defaultProps = {
    visible: false,
    onClose: () => {}
  };
  constructor(props) {
    super(props);
    console.log("ComponentCustomLoading : constructor : *** ");
  }

  /* #################### Render #################### */
  render() {
    const { classes } = this.props;
    return (
      // Material UI v3 Modal
      <Modal open={this.props.visible} onClose={() => {}}>
        <div className={classes.paper}>
          <CircularProgress size={50} color="primary" />
        </div>
      </Modal>
    );
  }
}

export default withStyles(styles)(ComponentCustomLoading);
