import React from 'react';
import useAuthentication from '../hooks/useAuthentication';

const Authentication = () => {
  const [form] = useAuthentication({});

  return (
    <div className='authentication-wrapper'>
      <div className='authentication-section left'></div>
      <div className='authentication-section right'>
        <form action='' className='authentication-form'>
          <h1 className='authentication-title'>Login</h1>
          <div className='authentication-group'>
            <input
              type='text'
              placeholder='Enter your first name.'
              className='authentication-input text'
            />
          </div>
          <div className='authentication-group'>
            <input
              type='text'
              placeholder='Enter your last name.'
              className='authentication-input text'
            />
          </div>
          <div className='authentication-group'>
            <input
              type='email'
              placeholder='Enter your email.'
              className='authentication-input text'
            />
          </div>
          <div className='authentication-group'>
            <input
              type='password'
              placeholder='Enter your password.'
              className='authentication-input text'
            />
          </div>
          <div className='authentication-group'>
            <input
              type='password'
              placeholder='Confirm your password.'
              className='authentication-input text'
            />
          </div>
          <div className='authentication-group'>
            <input type='submit' className='authentication-input submit' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Authentication;
