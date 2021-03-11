import { AppState } from "../../AppState";
import { useSetRecoilState } from "recoil";

export function useInfoNotification(): (message: string) => void {
  const setSnackState = useSetRecoilState(AppState.snackState);

  return (message: string): void => {
    setSnackState({
      open: true,
      message: message,
      severity: "info",
    });
  };
}

export function useSuccessNotification(): (message: string) => void {
  const setSnackState = useSetRecoilState(AppState.snackState);

  return (message: string): void => {
    setSnackState({
      open: true,
      message: message,
      severity: "success",
    });
  };
}

export function useErrorNotification(): (message: string) => void {
  const setSnackState = useSetRecoilState(AppState.snackState);

  return (message: string): void => {
    setSnackState({
      open: true,
      message: message,
      severity: "error",
    });
  };
}
