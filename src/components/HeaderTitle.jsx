import React from "react";
import { Link } from "react-router-dom";

function HeaderTitle() {
  return (
    <div className="header-title">
      <Link to="/">
        <h1>Task Tracker</h1>
      </Link>
    </div>
  );
}

export default HeaderTitle;
