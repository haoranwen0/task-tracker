import { useState } from "react";
import { Auth } from "aws-amplify";

const titleMapping = {
  signUp: "Create an account.",
  signIn: "Sign in.",
  confirmSignUp: "Confirmation code.",
};

const buttonMapping = {
  signUp: "Sign Up",
  signIn: "Sign In",
  confirmSignUp: "Confirm",
};

export default function useAuthControl(initialValue) {
  const [form, updateForm] = useState(initialValue);

  const state = form.state;
  const title = titleMapping[state];
  const buttonText = buttonMapping[state];

  const handleFormChange = (e) => {
    var { name, value } = e.target;
    updateForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmission = (e) => {
    if (state === "signUp") signUp();
    if (state === "confirmSignUp") confirmSignUp();
    if (state === "signIn") signIn();
  };

  const signUp = async () => {
    var { email, password } = form;
    try {
      //eslint-disable-next-line
      const { user } = await Auth.signUp({
        username: email,
        password,
      });
      updateForm((prevState) => ({
        ...prevState,
        state: "confirmSignUp",
      }));
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
    var { email, password } = form;
    try {
      const user = await Auth.signIn(email, password);
      console.log(user);
    } catch (e) {
      console.log(e);
    }
  };

  return [buttonText, title, state, handleFormChange, handleFormSubmission];
}
