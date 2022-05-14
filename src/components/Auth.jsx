import React from "react";
import { AuthInput } from "../mui/Input";
import { AuthButton } from "../mui/Button";
import useAuthControl from "../hooks/useAuthControl";

import "../css/Auth.css";

function Auth() {
  const [buttonText, title, state, handleFormChange, handleFormSubmission] =
    useAuthControl({
      state: "signUp",
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
    });

  return (
    <div className="auth-wrapper">
      <div className="auth">
        <div className="auth-title">
          <h1>{title}</h1>
        </div>
        <div className="auth-main">
          <div className="auth-section" />
          {(state === "signUp" || state === "signIn") && (
            <>
              <div className="auth-section">
                <AuthInput
                  fullWidth={true}
                  name="email"
                  placeholder="Enter Email"
                  onChange={handleFormChange}
                />
              </div>
              <div className="auth-section">
                <AuthInput
                  name="password"
                  fullWidth={true}
                  type="password"
                  placeholder="Enter Password"
                  onChange={handleFormChange}
                />
              </div>
            </>
          )}
          {state === "signUp" && (
            <div className="auth-section">
              <AuthInput
                name="confirmPassword"
                fullWidth={true}
                type="password"
                placeholder="Confirm Password"
                onChange={handleFormChange}
              />
            </div>
          )}
          {state === "confirmSignUp" && (
            <div className="auth-section">
              <AuthInput
                name="confirmationCode"
                fullWidth={true}
                placeholder="Confirm Code"
                onChange={handleFormChange}
              />
            </div>
          )}
          <div className="auth-section" />
          <div className="auth-section">
            <AuthButton
              variant="contained"
              fullWidth={true}
              onClick={handleFormSubmission}
            >
              {buttonText}
            </AuthButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
