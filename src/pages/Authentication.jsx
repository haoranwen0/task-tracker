import useAuthentication from '../hooks/useAuthentication';
import { Oval } from 'react-loading-icons';

const Authentication = ({ authenticationState }) => {
  const [form, error, loading, handleFormChange, onSubmit] = useAuthentication({
    state: authenticationState,
    password: '',
    confirmPassword: '',
    email: '',
    confirmationCode: '',
    firstName: '',
    lastName: '',
  });

  return (
    <div className='h-screen w-full flex'>
      <div className='flex-1 relative grid place-items-center'>
        <div className='flex items-center absolute top-12 left-12'>
          <div className='w-[14px] h-[14px] rounded-full bg-purple-600 mr-2' />
          <h1 className='font-bold text-xl'>Task Tracker</h1>
        </div>
        <form className='min-w-[24rem] max-w-[26rem]'>
          <div className='mb-10'>
            <h1 className='text-3xl font-bold mb-4'>
              {form.state === 'signIn'
                ? 'Welcome back'
                : form.state === 'signUp'
                ? 'Create an account'
                : form.state === 'confirmSignUp'
                ? 'Verify your email'
                : form.state === 'forgotPassword' ||
                  form.state === 'forgotPasswordSubmit'
                ? 'Reset your password'
                : null}
            </h1>
            <p className='text-gray-600 mb-4'>
              {form.state === 'signIn'
                ? 'Welcome back! Please enter your details'
                : form.state === 'signUp'
                ? "First time? Let's create your account"
                : form.state === 'confirmSignUp'
                ? 'Check your inbox for the confirmation code'
                : form.state === 'forgotPassword'
                ? 'Forgot your password? Enter your email to reset it'
                : null}
            </p>
            <p className='text-red-600'>{error}</p>
          </div>
          {form.state === 'signUp' && (
            <div className='w-full mb-4 flex'>
              <div className='w-1/2 flex flex-col mr-2'>
                <label className='mb-2' htmlFor='email'>
                  First name
                </label>
                <input
                  className='border p-2 rounded-md border-gray-300 focus:outline-none focus:border-purple-600 transition'
                  name='firstName'
                  type='text'
                  placeholder='Enter your first name'
                  value={form.firstName}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className='w-1/2 flex flex-col ml-2'>
                <label className='mb-2' htmlFor='email'>
                  Last name
                </label>
                <input
                  className='border p-2 rounded-md border-gray-300 focus:outline-none focus:border-purple-600 transition'
                  name='lastName'
                  type='text'
                  placeholder='Enter your last name'
                  value={form.lastName}
                  onChange={handleFormChange}
                  required
                />
              </div>
            </div>
          )}
          {(form.state === 'confirmSignUp' ||
            form.state === 'forgotPasswordSubmit') && (
            <div className='w-full mb-4 flex flex-col'>
              <label className='mb-2' htmlFor='confirmation code'>
                Confirmation Code
              </label>
              <input
                className='border p-2 rounded-md border-gray-300 focus:outline-none focus:border-purple-600 transition'
                name='confirmationCode'
                type='text'
                placeholder='Enter confirmation code'
                value={form.confirmationCode}
                onChange={handleFormChange}
                required
              />
            </div>
          )}
          {(form.state === 'signIn' ||
            form.state === 'signUp' ||
            form.state === 'forgotPassword') && (
            <div className='w-full mb-4 flex flex-col'>
              <label className='mb-2' htmlFor='email'>
                Email
              </label>
              <input
                className='border p-2 rounded-md border-gray-300 focus:outline-none focus:border-purple-600 transition'
                name='email'
                type='text'
                placeholder='Enter your email'
                value={form.email}
                onChange={handleFormChange}
                required
              />
            </div>
          )}
          {(form.state === 'signIn' ||
            form.state === 'signUp' ||
            form.state === 'forgotPasswordSubmit') && (
            <div className='w-full mb-4 flex flex-col'>
              <label className='mb-2' htmlFor='password'>
                Password
              </label>
              <input
                className='border p-2 rounded-md border-gray-300 focus:outline-none focus:border-purple-600 transition'
                name='password'
                type='password'
                placeholder='Enter your password'
                value={form.password}
                onChange={handleFormChange}
                required
              />
            </div>
          )}
          {(form.state === 'signUp' ||
            form.state === 'forgotPasswordSubmit') && (
            <>
              <div className='w-full mb-4 flex flex-col'>
                <label className='mb-2' htmlFor='password'>
                  Confirm password
                </label>
                <input
                  className='border p-2 rounded-md border-gray-300 focus:outline-none focus:border-purple-600 transition'
                  name='confirmPassword'
                  type='password'
                  placeholder='Confirm your password'
                  value={form.confirmPassword}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className='w-full mb-4'>
                <p className='text-sm'>
                  Password must contain at least 1{' '}
                  <span className='font-semibold'>number</span>, at least 1{' '}
                  <span className='font-semibold'>special character</span>, at
                  least 1 uppercase letter and at least 1{' '}
                  <span className='font-semibold'>lowercase letter</span>
                </p>
              </div>
            </>
          )}
          {form.state === 'signIn' && (
            <div className='w-full flex justify-end my-6'>
              <span
                className='text-sm font-semibold text-purple-600 cursor-pointer'
                onClick={() => (window.location.href = '/forgot-password')}
              >
                Forgot password
              </span>
            </div>
          )}
          <div className='w-full flex flex-col mb-8'>
            <button
              className={
                'border p-2 border-gray-300 bg-purple-600 rounded-md text-white cursor-pointer flex justify-center items-center' +
                `${
                  form.state === 'forgotPassword' ||
                  form.state === 'confirmSignUp' ||
                  form.state === 'signUp' ||
                  form.state === 'forgotPasswordSubmit'
                    ? ' mt-4'
                    : ''
                }`
              }
              onClick={onSubmit}
            >
              {loading ? (
                <Oval height='1.5rem' strokeWidth={3} />
              ) : form.state === 'signIn' ? (
                'Sign in'
              ) : form.state === 'signUp' ? (
                'Sign up'
              ) : form.state === 'forgotPassword' ? (
                'Reset password'
              ) : form.state === 'forgotPasswordSubmit' ? (
                'Reset password'
              ) : form.state === 'confirmSignUp' ? (
                'Confirm'
              ) : null}
            </button>
          </div>
          <div className='w-full mb-4 flex justify-center'>
            <span className='text-sm'>
              {form.state === 'signIn' && "Don't have an account? "}
              {form.state === 'signUp' && 'Already have an account? '}
              <span
                className='font-semibold text-purple-600 cursor-pointer'
                onClick={() => {
                  window.location.href =
                    form.state === 'signIn'
                      ? '/sign-up'
                      : form.state === 'signUp' ||
                        form.state === 'forgotPassword'
                      ? '/login'
                      : null;
                }}
              >
                {form.state === 'signIn' && 'Sign up'}
                {(form.state === 'signUp' || form.state === 'forgotPassword') &&
                  'Sign in'}
              </span>
            </span>
          </div>
        </form>
      </div>
      <div className='flex-1 grid place-items-center relative bg-gray-100'>
        <div className='w-60 h-60 rounded-full bg-purple-600' />
        <div className='h-1/2 w-full bg-gray-100 bg-opacity-50 backdrop-blur-lg absolute bottom-0 left-0' />
      </div>
    </div>
  );
};

export default Authentication;
