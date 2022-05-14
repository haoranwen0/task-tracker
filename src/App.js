import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Authentication from "./pages/Authentication";

import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/authentication" element={<Authentication />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
