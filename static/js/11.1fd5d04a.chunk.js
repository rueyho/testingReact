(this.webpackJsonpreactproject=this.webpackJsonpreactproject||[]).push([[11],{148:function(e,a,t){"use strict";t.d(a,"a",(function(){return b}));var n=t(3),r=t(4),o=t(39),l=t(27),i=t(40),s=t(0),c=t.n(s),u=t(13),d=t.n(u),m=t(233),g=t(17),h=t(55),p=Object(g.a)({root:{boxShadow:"none",textTransform:"none",fontSize:16,padding:"6px 12px",border:"1px solid",lineHeight:1.5,color:"white",borderColor:"#ffffff",fontFamily:["-apple-system","BlinkMacSystemFont",'"Segoe UI"',"Roboto",'"Helvetica Neue"',"Arial","sans-serif",'"Apple Color Emoji"','"Segoe UI Emoji"','"Segoe UI Symbol"'].join(","),"&:hover":{backgroundColor:"#0069d9",borderColor:"#0062cc",boxShadow:"none"},"&:active":{boxShadow:"none",backgroundColor:"#0062cc",borderColor:"#005cbf"},"&:focus":{boxShadow:"0 0 0 0.2rem rgba(0,123,255,.5)"}}})(m.a),b=function(e){function a(e){var t;return Object(n.a)(this,a),(t=Object(o.a)(this,Object(l.a)(a).call(this,e))).state={},t}return Object(i.a)(a,e),Object(r.a)(a,[{key:"onClose",value:function(){this.props.onClose()}},{key:"render",value:function(){var e=this.props,a=e.onClick,t=e.label;return c.a.createElement(p,{style:{backgroundColor:this.props.backgroundColor,marginRight:"10px"},onClick:a,variant:"contained",disableRipple:!0},t)}}]),a}(h.a);b.propTypes={visible:d.a.bool,title:d.a.string,onClose:d.a.func,onClick:d.a.func},b.defaultProps={visible:!1,title:"",onClose:function(){},onClick:function(){}}},151:function(e,a,t){"use strict";var n=t(3),r=t(4),o=t(39),l=t(27),i=t(40),s=t(0),c=t.n(s),u=t(13),d=t.n(u),m=t(133),g=t(17),h=t(253),p=function(e){function a(e){var t;return Object(n.a)(this,a),t=Object(o.a)(this,Object(l.a)(a).call(this,e)),console.log("ComponentCustomLoading : constructor : *** "),t}return Object(i.a)(a,e),Object(r.a)(a,[{key:"render",value:function(){var e=this.props.classes;return(c.a.createElement(h.a,{open:this.props.visible,onClose:function(){}},c.a.createElement("div",{className:e.paper},c.a.createElement(m.a,{size:50,color:"primary"}))))}}]),a}(t(55).a);p.propTypes={visible:d.a.bool,onClose:d.a.func},p.defaultProps={visible:!1,onClose:function(){}},a.a=Object(g.a)((function(e){return{paper:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",padding:15,borderRadius:"50%",outline:"none"}}}))(p)},246:function(e,a,t){"use strict";t.r(a);var n=t(63),r=t(3),o=t(4),l=t(39),i=t(27),s=t(40),c=t(0),u=t.n(c),d=t(50),m=t(201),g=t(110),h=t(17),p=t(148),b=t(151),f=t(239),E=t(243),C=t(242),v=t(238),k=t(240),N=t(257),S=t(241),y=t(244),x=t(55),w=t(16),O=t(8),j=t(58),R=t(28),I=t(255),P=Object(h.a)((function(e){return{root:{flexGrow:1},wrapper:{padding:15},paper:{width:"100%",color:e.palette.text.secondary},rowField:{padding:e.spacing(1)},label:{flexBasis:"20%"},textField:{flexBasis:"25%",marginRight:40},header:{padding:"15px",borderBottom:"1px solid #eee",fontWeight:500,fontSize:20},body:{padding:"15px"},tableContainer:{maxHeight:440},tableHeader:{borderTop:"1px solid rgb(250,250,250) !important",fontWeight:"bold",minWidth:170}}})),F=Object(d.b)((function(e,a){var t=e.ReduxBank,n={};if(t)for(var r=0;r<t.length;r++){var o=t[r];o.completed||(R.a.INIT_DONE===o.type?(n.onReadyFunction="requestInitDone",n._result_=o._result_):R.a.SEARCH_DONE===o.type?(n.onReadyFunction="requestSearchDone",n._result_=o._result_):R.a.ERROR===o.type&&(n.onReadyFunction="requestError",n._result_=o._result_),o.completed=!0)}return n})),T=function(e){function a(e){var t;return Object(r.a)(this,a),t=Object(l.a)(this,Object(i.a)(a).call(this,e)),console.log("ComponentBank : constructor : *** : ["+t.uuid()+"] ",e),t.state={isLoading:!1,isSubmit:!1,isError:!1,errorTitle:"",errorMsg:"",errorCode:"",form:{},data:{},result:[],rowsPerPage:5,page:0},t}return Object(s.a)(a,e),Object(o.a)(a,[{key:"_onReady",value:function(){this.requestSearch()}},{key:"onClickReset",value:function(){var e=this;console.log("ComponentBank onClickReset"),this.setState({form:Object(n.a)({},this.state.form,{userID:"",userType:"",role:"",status:"",branch:""})},(function(){console.log("aaaaaa",e.state.form)}))}},{key:"onClickSearch",value:function(){console.log("ComponentBank onClickSearchx"),this.requestSearch()}},{key:"onClickAddNew",value:function(){console.log("ComponentBank onClickAddNew"),w.b.route(w.b.mapPath(w.a.BANK_DETAIL))}},{key:"requestSearch",value:function(){var e=this;console.log("ComponentBank requestSearch"),this.setState({isLoading:!0},(function(){j.a.verify().then((function(){Promise.all([(new O.a).get(O.a.ENUM.SESSION,O.a.KEY.AUTHORIZATION_TOKEN_TYPE),(new O.a).get(O.a.ENUM.SESSION,O.a.KEY.AUTHORIZATION_ACCESS_TOKEN)]).then((function(a){e.dispatch(R.b.rSearch({authorizeType:a[0],authorizeToken:a[1]},{}))}))})).catch((function(a){e.requestError(a)}))}))}},{key:"requestSearchDone",value:function(e){console.log("ComponentBank : requestSearchDone : ***  : result => ",e),this.setState({isLoading:!1,result:e.bankusers,ElementNum:e.totalElement}),this.dispatch(R.b.rRequestEnd())}},{key:"onChangeField",value:function(e){console.log("onChangeField",e.target.value);var a=this.state.form;a[e.target.id]=e.target.value,this.setState({form:a})}},{key:"render",value:function(){var e=this,a=this.props.classes,t=this.state,n=t.form,r=t.rowsPerPage,o=t.page,l=t.result;return u.a.createElement("div",{className:a.root},u.a.createElement(m.a,{container:!0,className:a.wrapper},u.a.createElement(b.a,{visible:this.state.isLoading}),u.a.createElement(g.a,{className:a.paper},u.a.createElement("div",{className:a.header},"Bank User"),u.a.createElement("div",{style:{padding:15}},u.a.createElement(m.a,{item:!0,xs:12,alignItems:"baseline",container:!0,direction:"row",justify:"flex-start",className:a.rowField},u.a.createElement("div",{className:a.label},"User Type"),u.a.createElement(I.a,{className:a.textField,id:"userType",value:n.userType,variant:"outlined",size:"small",onChange:function(a){e.onChangeField(a)}}),u.a.createElement("div",{className:a.label},"Branch"),u.a.createElement(I.a,{className:a.textField,id:"branch",value:n.branch,variant:"outlined",size:"small",onChange:function(a){e.onChangeField(a)}})),u.a.createElement(m.a,{item:!0,xs:12,alignItems:"baseline",container:!0,direction:"row",justify:"flex-start",className:a.rowField},u.a.createElement("div",{className:a.label},"User ID"),u.a.createElement(I.a,{className:a.textField,id:"userID",value:n.userID,variant:"outlined",size:"small",onChange:function(a){e.onChangeField(a)}}),u.a.createElement("div",{className:a.label},"Status"),u.a.createElement(I.a,{className:a.textField,id:"status",value:n.status,variant:"outlined",size:"small",onChange:function(a){e.onChangeField(a)}})),u.a.createElement(m.a,{item:!0,xs:12,alignItems:"baseline",container:!0,direction:"row",justify:"flex-start",className:a.rowField},u.a.createElement("div",{className:a.label},"Role"),u.a.createElement(I.a,{className:a.textField,id:"role",value:n.role,variant:"outlined",size:"small",onChange:function(a){e.onChangeField(a)}})),u.a.createElement("div",{style:{textAlign:"center",marginTop:"15px"}},u.a.createElement(p.a,{onClick:function(){e.onClickReset()},backgroundColor:"#6a8669d9",label:"Reset"}),u.a.createElement(p.a,{onClick:function(){e.onClickSearch()},backgroundColor:"#12a20cd9",label:"Search"}),u.a.createElement(p.a,{onClick:function(){e.onClickAddNew()},backgroundColor:"red",label:"Add"}))))),u.a.createElement(m.a,{container:!0,className:a.wrapper},u.a.createElement(g.a,{className:a.paper},u.a.createElement(v.a,{className:a.container},u.a.createElement("div",{style:{padding:10}},"Search Result"),u.a.createElement(f.a,{stickyHeader:!0,"aria-label":"sticky table"},u.a.createElement(k.a,null,u.a.createElement(S.a,null,u.a.createElement(C.a,{align:"right",className:a.tableHeader},"User ID"),u.a.createElement(C.a,{align:"right",className:a.tableHeader},"User Name"),u.a.createElement(C.a,{align:"right",className:a.tableHeader},"Status"),u.a.createElement(C.a,{align:"right",className:a.tableHeader},"Role"),u.a.createElement(C.a,{align:"right",className:a.tableHeader},"Branch"),u.a.createElement(C.a,{align:"right",className:a.tableHeader},"Created Date/Time"))),u.a.createElement(E.a,null,l.slice(o*r,o*r+r).map((function(e){return u.a.createElement(S.a,{hover:!0,role:"checkbox",tabIndex:-1},u.a.createElement(C.a,{align:"right"},e.username),u.a.createElement(C.a,{align:"right"},e.name),u.a.createElement(C.a,{align:"right"},e.status),u.a.createElement(C.a,{align:"right"},e.persona),u.a.createElement(C.a,{align:"right"},"".concat(e.branchCode,"-").concat(e.branchName)),u.a.createElement(C.a,{align:"right"},e.creationDate))}))),u.a.createElement(y.a,null,u.a.createElement(S.a,null,u.a.createElement(N.a,{rowsPerPageOptions:[5,10,25,{label:"All",value:-1}],colSpan:6,count:l.length,rowsPerPage:r,page:o,SelectProps:{inputProps:{"aria-label":"rows per page"},native:!0},onChangePage:function(a,t){console.log("handleChangePage",t+a),e.setState({page:t})},onChangeRowsPerPage:function(a){console.log("handleChangeRowsPerPage",a),e.setState({rowsPerPage:parseInt(a.target.value,10),page:0})}}))))))))}}]),a}(x.a);a.default=F(P(T))}}]);
//# sourceMappingURL=11.1fd5d04a.chunk.js.map