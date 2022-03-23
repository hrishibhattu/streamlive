import { React, createContext, useReducer } from "react";
import * as types from "./types";

const initialState = {
  web3Provider: null,
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case types.SET_WEB3_PROVIDER:
        return { ...state, web3Provider: action.value };

      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
