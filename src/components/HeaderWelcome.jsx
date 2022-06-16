import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function HeaderWelcome() {
  const [firstName, setFirstName] = useState("");
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    if (user) {
      setFirstName(user.attributes.given_name);
    }
  }, [user]);

  return (
    <div className="header-welcome">
      {user && (
        <span className="header-welcome-message">Welcome, {firstName}!</span>
      )}
    </div>
  );
}

export default HeaderWelcome;
