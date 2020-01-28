import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ComponentAbstract from "../../_abstract/c.abstract";

const BootstrapButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    color: "white", //label
    borderColor: "#ffffff",
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
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc",
      boxShadow: "none"
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf"
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)"
    }
  }
})(Button);

export default class ComponentCustomButton extends ComponentAbstract {
  static propTypes = {
    visible: PropTypes.bool,

    title: PropTypes.string,
    onClose: PropTypes.func,
    onClick: PropTypes.func
  };

  static defaultProps = {
    visible: false,

    title: "",
    onClose: () => {},
    onClick: () => {}
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
    this.state = {};
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
      props: { onClick, label }
    } = this;
    // console.log("aasd", this.props);
    return (
      <BootstrapButton
        style={{
          backgroundColor: this.props.backgroundColor,
          marginRight: "10px"
        }}
        onClick={onClick}
        variant="contained"
        // color="primary"
        disableRipple
      >
        {label}
      </BootstrapButton>
    );
  }
}
