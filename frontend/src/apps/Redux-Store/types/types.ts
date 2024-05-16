import { AnyAction, Reducer } from "@reduxjs/toolkit";
import { SagaInjectionModes } from "redux-injectors";
import { Saga } from "redux-saga";
import { RootState } from "./index";

type RequiredRootState = Required<RootState>;

export type RootStateKeyType = keyof RootState;

export type InjectedReducersType = {
  [A in RootStateKeyType]?: Reducer<RequiredRootState[A], AnyAction>;
};

export interface InjectedReducerParam<Key extends RootStateKeyType> {
  key: Key;
  reducer: Reducer<RequiredRootState[Key], AnyAction>;
}

export interface InjectSagaParams {
  key: RootStateKeyType | string;
  saga: Saga;
  mode?: SagaInjectionModes;
}
