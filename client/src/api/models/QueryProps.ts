import { QueryObjectUrl } from "./QueryObjectUrl";

export interface QueryProps {
  getKey: string;
  getUrl: QueryObjectUrl | any;
  getMessage: string;
  postMessage: string;
  putMessage: string;
  deleteMessage: string;
  mutateUrl: string;
}
