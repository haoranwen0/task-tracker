import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth, Hub } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser } from './features/user/userSlice';

import Authentication from './pages/Authentication';
import Home from './pages/Home';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    checkAuthenticatedUser();
    setAuthListener();
    // eslint-disable-next-line
  }, []);

  const setAuthListener = async () => {
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signOut':
          dispatch(logoutUser());
          break;
        case 'signIn':
          dispatch(loginUser(data.payload.data));
          break;
        default:
          break;
      }
    });
  };

  const checkAuthenticatedUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      dispatch(loginUser(user));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/login'
            element={<Authentication authenticationState='signIn' />}
          />
          <Route
            path='/sign-up'
            element={<Authentication authenticationState='signUp' />}
          />
          <Route
            path='/forgot-password'
            element={<Authentication authenticationState='forgotPassword' />}
          />
          <Route path='/home' element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
