import useAuthentication from '../hooks/useAuthentication';

const Authentication = ({ authenticationState }) => {
  const [form, handleFormChange, onSubmit] = useAuthentication({
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
            <h1 className='text-3xl font-bold mb-4'>Welcome back</h1>
            <p className='text-gray-600'>
              Welcome back! Please enter your details.
            </p>
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
          {form.state === 'signUp' && (
            <>
              <div className='w-full mb-4 flex flex-col'>
                <label className='mb-2' htmlFor='password'>
                  Confirm password
                </label>
                <input
                  className='border p-2 rounded-md border-gray-300 focus:outline-none focus:border-purple-600 transition'
                  name='confirmPassword'
                  type='password'
                  placeholder='Enter your password again'
                  value={form.confirmPassword}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className='w-full mb-4'>
                <p className='text-sm'>
                  Contains at least 1{' '}
                  <span className='font-semibold'>number</span>, at least 1{' '}
                  <span className='font-semibold'>special character</span>, at
                  least 1 uppercase letter and at least 1{' '}
                  <span className='font-semibold'>lowercase letter</span>
                </p>
              </div>
            </>
          )}
          <div className='w-full flex justify-end my-6'>
            <span className='text-sm font-semibold text-purple-600 cursor-pointer'>
              Forgot password
            </span>
          </div>
          <div className='w-full flex flex-col mb-8'>
            <input
              className='border p-2 border-gray-300 bg-purple-600 rounded-md text-white cursor-pointer'
              type='submit'
              value='Sign in'
              onClick={onSubmit}
            />
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
                      : form.state === 'signUp'
                      ? '/login'
                      : null;
                }}
              >
                {form.state === 'signIn' && 'Sign up'}
                {form.state === 'signUp' && 'Sign in'}
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
