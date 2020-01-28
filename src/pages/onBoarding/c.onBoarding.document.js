import React from "react";
import PropTypes from "prop-types";
// import Grid from "react-bootstrap/lib/Grid";
// import Row from "react-bootstrap/lib/Row";
// import Col from "react-bootstrap/lib/Col";

/* ################################################## */
/*          Component                                 */
/* ################################################## */
import ComponentAbstract from "../_abstract/c.abstract";
// import "./s.onboardSubmit.detail.document.phase2.css";

export default class ComponentOnBoardingDoc extends ComponentAbstract {
  static propTypes = {
    data: PropTypes.array,
    cifnum: PropTypes.string,
    form: PropTypes.object,
    onChangeForm: PropTypes.func,
    onClickThumbnail: PropTypes.func
  };

  static defaultProps = {
    data: [],
    cifnum: "",
    form: {},
    onChangeForm: () => {},
    onClickThumbnail: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      containerWidth: 0,
      clickedThumbnailContainer: false
    };
    this.thumbnailContainer = [];
  }

  _onChange() {
    // An work around for pdf auto preview
    if (!this.state.clickedThumbnailContainer) {
      if (
        this.thumbnailContainer.length > 0 &&
        this.props.form.thumbnailDocumentId === ""
      ) {
        this.thumbnailContainer[0].click();
        this.setState({
          clickedThumbnailContainer: true
        });
      }
    }
  }

  /* ==================== Render ==================== */
  render() {
    return (
      <div
        className={"companyOnboard-submit-detail-document-container"}
        ref={refElement => {
          if (refElement) {
            if (
              this.state.containerWidth === 0 &&
              refElement.clientWidth !== 0
            ) {
              this.setState({ containerWidth: refElement.clientWidth });
            }
          }
        }}
      >
        {console.log("PROPS:1004 >>>", this.props)}
        {console.log("STATE:1004 >>>", this.state)}

        <div
          className={"companyOnboard-submit-detail-document-thumbnail-panel"}
          style={{ display: "none" }}
        >
          <div
            className={
              "companyOnboard-submit-detail-document-thumbnail-container"
            }
            style={{
              width: this.state.containerWidth + "px"
            }}
          >
            <div
              className={
                "companyOnboard-submit-detail-document-thumbnail-container-scroll"
              }
              style={{ width: 110 * 7 + 20 + "px" }}
            >
              {this.props.data.map((value, index) => {
                let link = "";
                if (value.links.length > 0) {
                  link = value.links[0].href;
                }

                return (
                  <div
                    key={"_thumbnail_" + index}
                    className={
                      "companyOnboard-submit-detail-document-thumbnail"
                    }
                  >
                    <div style={{ position: "relative", overflow: "hidden" }}>
                      <object
                        data={link}
                        type={"application/pdf"}
                        height="8000px"
                        width="100%"
                        style={{ marginTop: "-55px" }}
                      >
                        {" "}
                      </object>
                      <div
                        ref={el => {
                          if (this.thumbnailContainer.length > 0) {
                            if (!this.thumbnailContainer.includes(el)) {
                              this.thumbnailContainer.push(el);
                            }
                          } else {
                            this.thumbnailContainer.push(el);
                          }
                        }}
                        style={{
                          position: "absolute",
                          top: "0px",
                          left: "0px",
                          width: "90px",
                          height: "110px",
                          backgroundColor: "rgba( 4 , 4 , 4 , 0.1 )",
                          overflow: "hidden"
                        }}
                        onClick={() => {
                          this.props.onClickThumbnail(value.documentId);
                        }}
                      >
                        {" "}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className={"companyOnboard-submit-detail-document-dropdown-filelist"}
        >
          {/* <SelectField
            id={"ev-dropdown"}
            value={
              this.props.form.thumbnailDocumentId
                ? this.props.form.thumbnailDocumentId
                : this.state.form
            }
            onChange={(event, index, value) => {
              console.log(
                "EX >> onboardSubmit.detail.document.phase2 >> onChange >> ",
                value,
                this.props.data
              );
              this.props.onClickThumbnail(value);
              this.setState({ value });
            }}
            fullWidth
            style={
              this.props.data.length > 0
                ? {
                    backgroundColor: "rgba(255,255,255,1)",
                    border: "1px solid rgba(83,84,86,0.15)",
                    overflow: "hidden"
                  }
                : {
                    backgroundColor: "rgba(83,84,86,0.08)",
                    border: "1px solid rgba(83,84,86,0.05)",
                    overflow: "hidden"
                  }
            }
            menuStyle={{ textIndent: 25 }}
            underlineStyle={{ display: "none" }}
            hintStyle={{ textIndent: 25 }}
            hintText={
              this.props.data.length > 0 ? "Select file to preview" : ""
            }
            disabled={this.props.data.length > 0 ? false : true}
          >
            {console.log(
              "EX >> onboardSubmit.detail.document.phase2 >> Result >> ",
              this.props.data
            )}
            {this.props.data.length > 0
              ? this.props.data.map((value, index) => {
                  return (
                    <MenuItem
                      key={"_thumbnail__" + index}
                      value={value.documentId}
                      primaryText={
                        value.documentName
                          ? value.documentName
                          : this.props.cifnum + ` (${index + 1})`
                      }
                    />
                  );
                })
              : null}
          </SelectField> */}
        </div>

        <div className={"companyOnboard-submit-detail-document-padding-10"}>
          {/* <Grid fluid>
            <Row className="show-grid">
              <Col md={12}>
                Uploaded Date : {this.props.form.thumbnailUploadDate}
              </Col>
            </Row>
          </Grid>

          <Grid fluid>
            <Row className="show-grid">
              <Col md={12}>
                Uploaded Branch : {this.props.form.thumbnailUploadBranch}
              </Col>
            </Row>
          </Grid>

          <Grid fluid>
            <Row className="show-grid">
              <Col md={12}>
                Uploaded By : {this.props.form.thumbnailUploadBy}
              </Col>
            </Row>
          </Grid> */}
        </div>

        <div
          className={
            "companyOnboard-submit-detail-document-padding-10 companyOnboard-submit-detail-document-height-70p companyOnboard-submit-detail-document-height-max-700 companyOnboard-submit-detail-document-border"
          }
        >
          <embed
            src={
              "blob:https://sit-bugfix-bbo.apps.ocp.nonprod.ambg.com.my/f2d0717a-2ddb-4205-a6f0-c8515c8185df"
            }
            key={
              "blob:https://sit-bugfix-bbo.apps.ocp.nonprod.ambg.com.my/f2d0717a-2ddb-4205-a6f0-c8515c8185df"
            }
            className={"companyDocUpload-document-image"}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    );
  }
}
