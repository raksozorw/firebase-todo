import { SIGN_IN, SIGN_OUT, START_FETCHING, STOP_FETCHING } from "./types";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const fetch = () => {
  return {
    type: START_FETCHING,
  };
};

export const stopFetch = () => {
  return {
    type: STOP_FETCHING,
  };
};
