import { QueryObjectUrl } from "./QueryObjectUrl";

export interface QueryProps {
  getKey: string;
  getUrl: QueryObjectUrl;
  getErrorMessage: string;
  postSuccessMessage: string;
  putSuccessMessage: string;
  deleteSuccessMessage: string;
  mutateUrl: string;
}
