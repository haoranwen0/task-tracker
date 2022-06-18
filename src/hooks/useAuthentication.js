import { useState } from 'react';

export default function useAuthentication(initialValue) {
  const [form, updateForm] = useState(initialValue);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    updateForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return [form, handleFormChange, onSubmit];
}
