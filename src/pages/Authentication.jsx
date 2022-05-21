import React from "react";

import Auth from "../components/Auth";
import AuthBg from "../components/AuthBg";

import "../css/Authentication.css";

function Authenticaton({ state }) {
  return (
    <div className="login-wrapper">
      <AuthBg />
      <Auth formState={state} />
    </div>
  );
}

export default Authenticaton;
