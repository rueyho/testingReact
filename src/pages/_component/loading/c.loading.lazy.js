import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";


export default new class ComponentCustomLazyLoad {
  loadLoading(props) {
    if (props.error) {
      return <div>error ...</div>;
    } else {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <CircularProgress color={"primary"} thickness={7} />
        </div>
      );
    }
  }
}();
