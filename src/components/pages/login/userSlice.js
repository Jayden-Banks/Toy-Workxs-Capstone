// State
const initialState = {
  user: "",
};

// Action Creator = a function that holds an action
export const login = (userLoggingIn) => {
  // The object below is called an action
  return {
    type: "user/login",
    payload: userLoggingIn,
  };
};

export const logout = () => {
  localStorage.setItem("user", JSON.stringify(""));
  return {
    type: "user/logout",
    payload: "",
  };
};

// Reducer
export default function userSlice(state = initialState, action) {
  switch (action.type) {
    case "user/login": {
      return {
        user: action.payload,
      };
    }
    case "user/logout": {
      return {
        user: action.payload,
      };
    }
    default:
      return state;
  }
}
