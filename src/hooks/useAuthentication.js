import { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/user/userSlice';

export default function useAuthentication(initialValue) {
  const dispatch = useDispatch();

  const [form, updateForm] = useState(initialValue);
  const [error, updateError] = useState('');
  const [loading, updateLoading] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    updateForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    updateError('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (form.state === 'signIn') signIn();
    if (form.state === 'signUp') signUp();
    if (form.state === 'confirmSignUp') confirmSignUp();
    if (form.state === 'forgotPassword') forgotPassword();
    if (form.state === 'forgotPasswordSubmit') forgotPasswordSubmit();
  };

  const checkPasswordMatch = () => {
    if (!(form.password === form.confirmPassword)) {
      updateError("Passwords don't match.");
      return false;
    }
    return true;
  };

  const checkValidEmail = () => {
    if (
      !String(form.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      updateError('Invalid email address.');
      return false;
    }
    return true;
  };

  const signIn = async () => {
    if (form.email === '' || form.password === '') {
      updateError('Empty form fields.');
      return;
    }
    if (!checkValidEmail()) return;

    updateLoading((prevState) => !prevState);
    try {
      const user = await Auth.signIn(form.email, form.password);
      // console.log(user);
      dispatch(loginUser(user));
    } catch (e) {
      updateError(e.message);
    }
    updateLoading((prevState) => !prevState);
  };

  const signUp = async () => {
    console.log(form);
    if (
      form.firstName === '' ||
      form.lastName === '' ||
      form.email === '' ||
      form.password === '' ||
      form.confirmPassword === ''
    ) {
      updateError('Empty form fields.');
      return;
    }
    if (!checkValidEmail()) return;
    if (!checkPasswordMatch()) return;

    updateLoading((prevState) => !prevState);
    try {
      const { user } = await Auth.signUp({
        username: form.email,
        password: form.password,
        attributes: {
          given_name: form.firstName,
          family_name: form.lastName,
        },
      });
      updateForm((prevState) => ({
        ...prevState,
        state: 'confirmSignUp',
      }));
      console.log(user);
    } catch (e) {
      updateError(e.message);
    }
    updateLoading((prevState) => !prevState);
  };

  const confirmSignUp = async () => {
    if (form.confirmationCode === '') {
      updateError('Empty confirmation code.');
      return;
    }

    updateLoading((prevState) => !prevState);
    try {
      await Auth.confirmSignUp(form.email, form.confirmationCode);
      window.location.href = '/login';
    } catch (e) {
      updateError(e.message);
    }
    updateLoading((prevState) => !prevState);
  };

  const forgotPassword = async () => {
    if (form.email === '') {
      updateError('Empty email address.');
      return;
    }
    if (!checkValidEmail()) return;

    updateLoading((prevState) => !prevState);
    try {
      const forgotPasswordStatus = await Auth.forgotPassword(form.email);
      updateForm((prevState) => ({
        ...prevState,
        state: 'forgotPasswordSubmit',
      }));
      console.log(forgotPasswordStatus);
    } catch (e) {
      updateError(e.message);
    }
    updateLoading((prevState) => !prevState);
  };

  const forgotPasswordSubmit = async () => {
    if (
      form.confirmationCode === '' ||
      form.password === '' ||
      form.confirmPassword === ''
    ) {
      updateError('Empty form fields.');
      return;
    }
    if (!checkPasswordMatch()) return;

    updateLoading((prevState) => !prevState);
    try {
      const forgotPasswordSubmitStatus = await Auth.forgotPasswordSubmit(
        form.email,
        form.confirmationCode,
        form.password
      );
      console.log(forgotPasswordSubmitStatus);
      window.location.href = '/login';
    } catch (e) {
      updateError(e.message);
    }
    updateLoading((prevState) => !prevState);
  };

  return [form, error, loading, handleFormChange, onSubmit];
}
