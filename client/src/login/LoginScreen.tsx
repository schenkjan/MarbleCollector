import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { LoginForm } from "./LoginForm";
import { AuthResponse } from "./models/AuthResponse";
import { LoginRequest } from "./models/LoginRequest";
import { Backdrop, CircularProgress } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useRecoilState } from "recoil";
import { userInfoState } from "../AppState";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://treasurepursuits.com/wp-content/uploads/2016/04/15331206437_2d0e02c170_b.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export function LoginScreen() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  // TODO handle rememberme
  async function login(
    username: string,
    password: string,
    rememberMe: boolean
  ) {
    setLoading(true);
    try {
      const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;
      const apiRestTestUrl = `${apiBaseUrl}/api/auth/login`;
      const loginRequest: LoginRequest = {
        username: username,
        password: password,
      };
      const loginResponse = await axios.post<AuthResponse>(
        apiRestTestUrl,
        loginRequest
      );
      setUserInfo(loginResponse.data);
      // redirect to dashboard
    } catch (error) {
      setSnackbar({
        open: true,
        message: `${error.message}: ${JSON.stringify(error.response.data)}`,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <LoginForm username={userInfo?.username ?? ""} login={login} />
          </div>
        </Grid>
      </Grid>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        open={snackbar.open}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbar({ open: false, message: "" })}
          severity="error"
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
