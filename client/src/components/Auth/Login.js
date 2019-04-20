import React, { useContext } from "react";
import { GraphQLClient } from "graphql-request";
import { GoogleLogin } from "react-google-login";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Context from "../../context"
import { ME_QUERY } from "../../graphql/queries"

const Login = ({ classes }) => {
  const { dispatch } = useContext(Context)
  const onSuccess = async googleUser => {
    try {
      const idToken = googleUser.getAuthResponse().id_token;
      const client = new GraphQLClient('http://localhost:4000/graphql', {
        headers: { authorization: idToken }
      });
      const { me } = await client.request(ME_QUERY)

      dispatch({
        type: "LOGIN_USER",
        payload: me
      })
      dispatch({
        type: "IS_LOGGED_IN",
        payload: googleUser.isSignedIn()
      })
    } catch (error) {
      onFailure(error)
    }
  };

  const onFailure = error => {
    console.log('error: ', error);
  }

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h3"
        gutterBottom
        noWrap
        style={{ color: "rgb(66, 133, 244)"}}
      >
        Welcome
      </Typography>
      <GoogleLogin
      clientId="82816786134-fivnu8nqjeckgri2i4d7vvkoek67e7t8.apps.googleusercontent.com"
      onSuccess={onSuccess}
      onFailure={onFailure}
      isSignedIn={true}
      buttonText="Login with Google"
      theme="dark"
    />
    </div>
  );
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);
