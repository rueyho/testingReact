import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

// import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
// import createMuiTheme from "@material-ui/core/styles/createMuiTheme"; //refer cfo
import ComponentMain from "./pages/main/c.main";

import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./_redux/reducer";
import reduxSaga from "./_redux/saga";
import { unregister } from "./registerServiceWorker";

import "./index.css";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
  // other store enhancers if any
);
const store = createStore(reducers, enhancer);
sagaMiddleware.run(reduxSaga);

const Container = () => (
  // <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)} >
  <Provider store={store}>
    <MuiThemeProvider>
      <ComponentMain />
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(<Container />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// serviceWorker.unregister();
unregister();
