import { ReduxEnumLogout } from "../action/reduxAction.logout";

export default function ReduxLogout(state = [], action) {
  let hasKey = false;
  let keys = Object.keys(ReduxEnumLogout);
  for (let i = 0; i < keys.length; i++) {
    if (ReduxEnumLogout[keys[i]] === action.type) {
      hasKey = true;
      break;
    }
  }

  if (hasKey) {
    let newState = [];
    for (let i = 0; i < state.length; i++) {
      if (state[i]["completed"] === false) {
        newState.push(state[i]);
      }
    }

    return [...newState, Object.assign({}, action, { completed: false })];
  } else {
    return state;
  }
}
