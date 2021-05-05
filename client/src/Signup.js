import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Paper,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles, ThemeProvider} from "@material-ui/core/styles";
import { register } from "./store/utils/thunkCreators";
import BackgroundImage from "./components/BackgroundImage";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
  },
  blueButton: {
    color: "white",
    background: "rgba(58, 141, 255, 1)",
    height: "50px",
    width: "120px",
  },
  whiteButton: {
    color: "rgba(58, 141, 255, 1)",
    background: "white",
    height: "50px",
    width: "120px",
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
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const classes = useStyles();

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home"/>;
  }

  return (
    <Grid container justify="center" className={classes.root}>
      <BackgroundImage/>
      <Box>
        <Box display="flex" mr={2} p={2}>
          <Box display="flex" m={1} p={1}>
            <Typography className={classes.text}>Already have an account?</Typography>
          </Box>
          <Button variant="contained" className = {classes.whiteButton} onClick={() => history.push("/login")}>Login</Button>
        </Box>
        <form onSubmit={handleRegister} className={classes.form}>
          <Box justifyContent="center" m={2} p={2}>
            <Grid>
              <Typography
                className={classes.header}
                style = {{marginBottom: 45}}
              >
                Create an account.
              </Typography>
              <Grid>
                <Typography className={classes.text}>Username</Typography>
                <FormControl>
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
              <Grid>
                <Typography className={classes.text}>E-mail address</Typography>
                <FormControl>
                  <TextField
                    label="E-mail address"
                    aria-label="e-mail address"
                    type="email"
                    name="email"
                    style = {{width: 400, marginBottom: 45}}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid>
                <Typography className={classes.text}>Password</Typography>
                <FormControl error={!!formErrorMessage.confirmPassword}>
                  <TextField
                    aria-label="password"
                    label="Password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="password"
                    style = {{width: 400, marginBottom: 45}}
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid>
                <Typography className={classes.text}>Confirm Password</Typography>
                <FormControl error={!!formErrorMessage.confirmPassword}>
                  <TextField
                    label="Confirm Password"
                    aria-label="confirm password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="confirmPassword"
                    style = {{width: 400, marginBottom: 45}}
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" size="large" className={classes.blueButton}>
              Create
            </Button>
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
