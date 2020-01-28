import { ReduxEnumGlobal } from "../action/reduxAction.global";

export default function ReduxGlobal(state = [], action) {
  let hasKey = false;
  let keys = Object.keys(ReduxEnumGlobal);
  for (let i = 0; i < keys.length; i++) {
    if (ReduxEnumGlobal[keys[i]] === action.type) {
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
