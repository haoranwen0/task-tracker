import React from "react";

import Auth from "../components/Auth";
import AuthBg from "../components/AuthBg";

import "../css/Authentication.css";

function Authenticaton() {
  return (
    <div className="login-wrapper">
      <AuthBg />
      <Auth />
    </div>
  );
}

export default Authenticaton;
