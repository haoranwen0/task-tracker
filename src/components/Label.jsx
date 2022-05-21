import React, { useState } from "react";
import { labelOff, labelOn } from "../constants/styles";

import "../css/Label.css";

function Label({ label, category }) {
  const [selected, updateSelected] = useState(false);

  const handleClick = () => {
    updateSelected((prev) => !prev);
    if (category === "default") {
    }
  };

  return (
    <span
      className="label"
      onClick={handleClick}
      style={selected ? (category === "default" ? labelOn : labelOff) : null}
    >
      {label}
    </span>
  );
}

export default Label;
