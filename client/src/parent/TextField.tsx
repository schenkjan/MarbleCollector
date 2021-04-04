import { fieldToTextField, TextFieldProps } from "formik-material-ui";
import { useCallback } from "react";
import MuiTextField from "@material-ui/core/TextField";

export function TextField(props: TextFieldProps) {
  const {
    form: { setFieldValue },
    field: { name },
  } = props;

  const onChange = useCallback(
    (event) => {
      const { value } = event.target;
      setFieldValue(name, value);
      //setFieldValue(name, event.target); // without destructuring the component does not correctly render as soon as a change has happened!
    },
    [setFieldValue, name]
  );

  return <MuiTextField {...fieldToTextField(props)} onChange={onChange} />;
}
