import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import { makeStyles} from "@material-ui/core/styles";
import BackgroundImage from "./components/BackgroundImage";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
  },
  blueButton: {
    color: "white",
    background: "rgba(58, 141, 255, 1)",
    height: "50px",
    width: "80px",
  },
  whiteButton: {
    color: "rgba(58, 141, 255, 1)",
    background: "white",
    height: "50px",
    width: "80px",
  },
  header: {
    fontSize: 30,
  },
  form: {
    height: "600px",
    width: "400px",
  },
  text: {
    color: "grey",
  }
}));

const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;
  const classes = useStyles();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container justify="center" className={classes.root}>
      <BackgroundImage/>
      <Box>
        <Box display="flex" mr={2} p={2}>
          <Box display="flex" m={1} p={1}>
            <Typography className={classes.text}>Already have an account?</Typography>
          </Box>
          <Button variant="contained" className = {classes.whiteButton} onClick={() => history.push("/register")}>Register</Button>
        </Box>
        <form onSubmit={handleLogin} className={classes.form}>
          <Box justifyContent="center" m={2} p={2}>
            <Grid>
              <Typography
                className={classes.header}
                style = {{marginBottom: 45}}
              >
                Welcome back!
              </Typography>
              <Grid>
                <Typography className={classes.text}>Username</Typography>
                <FormControl margin="normal" required>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                    style = {{width: 400, marginBottom: 45}}
                    required
                  />
                </FormControl>
              </Grid>
                <Typography className={classes.text}>password</Typography>
                <FormControl margin="normal" required>
                  <TextField
                    label="password"
                    aria-label="password"
                    type="password"
                    name="password"
                    style = {{width: 400, marginBottom: 45}}
                    required
                  />
                </FormControl>
              <Grid>
                <Button type="submit" variant="contained" size="large" className={classes.blueButton}>
                  Login
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
