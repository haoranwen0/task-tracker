import { useState } from 'react';
import { Auth } from 'aws-amplify';

export default function useAuthentication(initialValue) {
  const [form, updateForm] = useState(initialValue);
  const [error, updateError] = useState('');

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
  };

  const signIn = async () => {
    try {
      const user = await Auth.signIn(form.email, form.password);
      console.log(user);
    } catch (e) {
      updateError(e.message);
    }
  };

  const signUp = async () => {
    if (form.password !== form.confirmPassword) {
      updateError("Passwords don't match.");
      return;
    }

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
  };

  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(form.email, form.confirmationCode);
      window.location.href = '/login';
    } catch (e) {
      updateError(e.message);
    }
  };

  return [form, error, handleFormChange, onSubmit];
}
