import { useState } from 'react';

export default function useAuthentication(initialValue) {
  const [form, updateForm] = useState(initialValue);

  return [form];
}
