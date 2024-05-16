/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers } from "@reduxjs/toolkit";
import { InjectedReducersType } from "./types/types";

export const createReducer = (injectedReducers: InjectedReducersType = {}) => {
  if (Object.keys(injectedReducers).length === 0) {
    return (state: any) => state;
  } else {
    return combineReducers({ ...injectedReducers });
  }
};
