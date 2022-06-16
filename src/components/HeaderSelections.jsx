import React from "react";
import { Link } from "react-router-dom";

function HeaderSelections() {
  return (
    <div className="header-selections">
      <Link to="/sign-up">
        <span className="header-selection hover-underline-animation">
          Sign Up
        </span>
      </Link>
      <Link to="/login">
        <span className="header-selection hover-underline-animation">
          Login
        </span>
      </Link>
    </div>
  );
}

export default HeaderSelections;
