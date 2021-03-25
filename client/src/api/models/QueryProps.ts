import { QueryObjectUrl } from "./QueryObjectUrl";

export interface QueryProps {
  getKey: string;
  getUrl: QueryObjectUrl;
  getMessage: string;
  postMessage: string;
  putMessage: string;
  deleteMessage: string;
  mutateUrl: string;
}
