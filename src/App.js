// Library imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Page imports
import Authentication from './pages/Authentication';

function App() {
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
