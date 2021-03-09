import { Color } from "@material-ui/lab/Alert";

export interface SnackState {
  open: boolean;
  message: string;
  severity: Color;
}
