// Library imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Page imports
import Authentication from './pages/Authentication';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<Authentication />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
