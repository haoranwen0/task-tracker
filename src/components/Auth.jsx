import React from "react";
import { SubmitButton } from "../mui/Button";
import useAuthControl from "../hooks/useAuthControl";
import { disabled } from "../constants/styles";
import { useSelector } from "react-redux";

function Auth({ formState }) {
  const [
    buttonText,
    title,
    state,
    loading,
    handleFormChange,
    handleFormSubmission,
    handleFormRedirect,
  ] = useAuthControl({
    state: formState,
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
    lastName: "",
    firstName: "",
  });

  const user = useSelector((state) => state.user.value);

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="auth-wrapper">
      <form className="auth">
        <div className="auth-title">
          <h1>{title}</h1>
        </div>
        <div className="auth-main">
          <div className="auth-section" />
          {(state === "signUp" ||
            state === "signIn" ||
            state === "forgotPassword") && (
            <div className="auth-section">
              <input
                className="auth-input"
                name="email"
                placeholder="Enter Email"
                onChange={handleFormChange}
              />
            </div>
          )}
          {state === "signUp" && (
            <>
              <div className="auth-section">
                <input
                  className="auth-input"
                  name="lastName"
                  placeholder="Last name"
                  onChange={handleFormChange}
                />
              </div>
              <div className="auth-section">
                <input
                  className="auth-input"
                  name="firstName"
                  placeholder="First name"
                  onChange={handleFormChange}
                />
              </div>
            </>
          )}
          {(state === "confirmSignUp" || state === "resetPassword") && (
            <div className="auth-section">
              <input
                className="auth-input"
                name="confirmationCode"
                placeholder="Confirm Code"
                onChange={handleFormChange}
              />
            </div>
          )}
          {(state === "signUp" ||
            state === "signIn" ||
            state === "resetPassword") && (
            <div className="auth-section">
              <input
                className="auth-input"
                name="password"
                type="password"
                placeholder="Enter Password"
                onChange={handleFormChange}
              />
            </div>
          )}
          {(state === "signUp" || state === "resetPassword") && (
            <div className="auth-section">
              <input
                className="auth-input"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={handleFormChange}
              />
            </div>
          )}
          <div className="auth-section" />
          <div className="auth-section">
            <SubmitButton
              type="submit"
              onClick={handleFormSubmission}
              sx={loading ? null : disabled}
            >
              {buttonText}
            </SubmitButton>
          </div>
          <div className="auth-section redirect">
            {state === "signUp" && (
              <span
                className="auth-redirect-selections hover-underline-animation"
                onClick={() => handleFormRedirect("signIn")}
              >
                Alreay have an account?
              </span>
            )}
            {state === "forgotPassword" && (
              <span
                className="auth-redirect-selections hover-underline-animation"
                onClick={() => handleFormRedirect("signIn")}
              >
                Go back
              </span>
            )}
            {state === "signIn" && (
              <>
                <span
                  className="auth-redirect-selections hover-underline-animation"
                  onClick={() => handleFormRedirect("forgotPassword")}
                >
                  Forgot password
                </span>
                <span
                  className="auth-redirect-selections hover-underline-animation"
                  onClick={() => handleFormRedirect("signUp")}
                >
                  Create an account
                </span>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Auth;
