import { LoadingData } from "./LoadingData";
import { QueryUrl } from "./queryUrl";

export interface QueryGetState {
  active: boolean;
  url: QueryUrl;
  id?: string;
  body?: {};
  response?: LoadingData;
}
