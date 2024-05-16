import { AxiosProgressEvent, Method, ResponseType } from "axios";

export interface HeaderObj {
  Authorization?: string;
  RFTOKEN?: string;
  "Content-Type"?: string;
  "Content-Encoding"?: string;
}

export interface IAPICallConfig {
  pyUrl?:boolean;
  route: string;
  method: Method;
  body?: object | FormData;
  query?: object;
  headers?: HeaderObj;
  isSecureRoute: boolean;
  responseType?: ResponseType;
  dontRefresh?: boolean;
  onUploadProgress?: (event: AxiosProgressEvent) => void;
}
