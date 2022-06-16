import { useState } from "react";
import { Auth } from "aws-amplify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux-features/userSlice";

const titleMapping = {
  signUp: "Create an account.",
  signIn: "Sign in.",
  confirmSignUp: "Confirmation code.",
  forgotPassword: "Forgot password.",
  resetPassword: "Reset password.",
};

const buttonMapping = {
  signUp: "Sign Up",
  signIn: "Sign In",
  confirmSignUp: "Confirm",
  forgotPassword: "Send Confirmation Code",
  resetPassword: "Reset Password",
};

export default function useAuthControl(initialValue) {
  let navigate = useNavigate();

  const [form, updateForm] = useState(initialValue);
  const [loading, updateLoading] = useState("false");

  const dispatch = useDispatch();

  const state = form.state;
  const title = titleMapping[state];
  const buttonText = buttonMapping[state];

  const handleFormChange = (e) => {
    var { name, value } = e.target;
    updateForm((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    if (state === "signUp") signUp();
    if (state === "confirmSignUp") confirmSignUp();
    if (state === "signIn") signIn();
    if (state === "forgotPassword") forgotPassword();
    if (state === "resetPassword") resetPassword();
  };

  const handleFormRedirect = (redirect) => {
    if (redirect === "signIn") navigate("/login", { replace: true });
    if (redirect === "signUp") navigate("/sign-up", { replace: true });
    if (redirect === "forgotPassword")
      navigate("/forgot-password", { replace: true });
    updateForm((prevState) => ({
      ...prevState,
      state: redirect,
    }));
  };

  const signUp = async () => {
    var { email, password, firstName, lastName } = form;
    try {
      const { user } = await Auth.signUp({
        username: email,
        password,
        attributes: {
          family_name: lastName,
          given_name: firstName,
        },
      });
      updateForm((prevState) => ({
        ...prevState,
        state: "confirmSignUp",
      }));
      console.log(user);
    } catch (e) {
      console.log(e);
    }
  };

  const confirmSignUp = async () => {
    var { email, confirmationCode } = form;
    try {
      const user = await Auth.confirmSignUp(email, confirmationCode);
      console.log(user);
      updateForm((prevState) => ({
        ...prevState,
        state: "signIn",
      }));
    } catch (e) {
      console.log(e);
    }
  };

  const signIn = async () => {
    updateLoading((prevState) => !prevState);
    var { email, password } = form;
    try {
      const user = await Auth.signIn(email, password);
      dispatch(loginUser(user));
      updateLoading((prevState) => !prevState);
      console.log(user);
    } catch (e) {
      console.log(e);
    }
  };

  const forgotPassword = async () => {
    var { email } = form;
    try {
      const result = Auth.forgotPassword(email);
      updateForm((prevState) => ({
        ...prevState,
        state: "resetPassword",
      }));
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  const resetPassword = async () => {
    var { email, password, confirmationCode } = form;
    try {
      const result = Auth.forgotPasswordSubmit(
        email,
        confirmationCode,
        password
      );
      updateForm((prevState) => ({
        ...prevState,
        state: "signIn",
      }));
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  return [
    buttonText,
    title,
    state,
    loading,
    handleFormChange,
    handleFormSubmission,
    handleFormRedirect,
  ];
}
