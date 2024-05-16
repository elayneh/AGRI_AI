import {
  useInjectReducer as useReducer,
  useInjectSaga as useSaga,
} from "redux-injectors";
import {
  InjectedReducerParam,
  InjectSagaParams,
  RootStateKeyType,
} from "../types/types";

export function useInjectReducer<Key extends RootStateKeyType>(
  params: InjectedReducerParam<Key>
) {
  return useReducer(params);
}

export function useInjectSaga(params: InjectSagaParams) {
  return useSaga(params);
}
