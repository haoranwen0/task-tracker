import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "./redux-features/userSlice";
import { callCurrentAuthenticatedUser } from "./logic/callAuthCheckers";

import Header from "./components/Header";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    callCurrentAuthenticatedUser().then((res) => {
      if (res.status === true) {
        dispatch(loginUser(res.user));
      }
    });
  }, [dispatch]);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Authentication state="signIn" />} />
          <Route path="/sign-up" element={<Authentication state="signUp" />} />
          <Route
            path="/forgot-password"
            element={<Authentication state="forgotPassword" />}
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
