import { QueryObjectUrl } from "./QueryObjectUrl";

export interface QueryProps {
  getKey: string;
  getUrl: QueryObjectUrl;
  getErrorMessage: string;
  postSuccessMessage: string;
  postErrorMessage: string;
  putSuccessMessage: string;
  putErrorMessage: string;
  deleteSuccessMessage: string;
  deleteErrorMessage: string;
  mutateUrl: string;
}
