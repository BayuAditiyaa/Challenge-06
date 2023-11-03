import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "react-bootstrap";
import {useDispatch} from 'react-redux'
import { registerLoginWithGoogle } from "../Redux/Actions/authActions";
import { useNavigate } from "react-router-dom";

function GoogleLogin({ buttonText }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) =>
      dispatch(registerLoginWithGoogle(responseGoogle.access_token, navigate)),
  });

  return (
    <Button variant="primary" onClick={() => loginWithGoogle()}>
      {buttonText}
    </Button>
  );
}

export default GoogleLogin;