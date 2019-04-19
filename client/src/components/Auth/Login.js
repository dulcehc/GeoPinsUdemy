import React, { useContext } from "react";
import { GraphQLClient } from "graphql-request";
import { GoogleLogin } from "react-google-login";
import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";

import Context from "../../context"

const ME_QUERY = `
  {
    me {
      _id
      name
      email
      picture
    }
  }
`

const Login = ({ classes }) => {
  const { dispatch } = useContext(Context)
  const onSuccess = async googleUser => {
    //console.log({ googleUser });
    const idToken = googleUser.getAuthResponse().id_token;
    const client = new GraphQLClient('http://localhost:4000/graphql', {
      headers: { authorization: idToken }
    });
    const data = await client.request(ME_QUERY)
    //console.log(data);
    dispatch({
      type: "LOGIN_USER",
      payload: data.me
    })
  };

  const onFailure = error => {
    console.log('error: ', error);
  }

  return (
    <GoogleLogin
      clientId="82816786134-fivnu8nqjeckgri2i4d7vvkoek67e7t8.apps.googleusercontent.com"
      onSuccess={onSuccess}
      onFailure={onFailure}
      isSignedIn={true}
    />
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
