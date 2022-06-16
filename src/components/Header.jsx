import React from "react";

import HeaderTitle from "./HeaderTitle";
import HeaderWelcome from "./HeaderWelcome";
import HeaderSelections from "./HeaderSelections";

function Header() {
  return (
    <div className="header-wrapper">
      <HeaderTitle />
      <HeaderWelcome />
      <HeaderSelections />
    </div>
  );
}

export default Header;
