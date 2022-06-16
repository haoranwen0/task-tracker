import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { SubmitButton } from "../mui/Button";

import Label from "./Label";

function ControlSection({ title, create, labels }) {
  const [showMenu, updateShowMenu] = useState(false);

  return (
    <>
      <div className="control-guide">
        <span className="title">{title}</span>
        {create && (
          <div className="control-create-wrapper">
            <span
              className="create hover-underline-animation"
              onClick={() => updateShowMenu((prev) => !prev)}
            >
              Create
            </span>
            {showMenu && (
              <div className="control-create-menu">
                <div className="control-create-menu-section">
                  <input
                    type="text"
                    name="label"
                    placeholder="label"
                    className="control-create-menu-input"
                  />
                </div>
                <div className="control-create-menu-section">
                  <SubmitButton>Create Label</SubmitButton>
                </div>
                <div
                  className="create-menu-close"
                  onClick={() => updateShowMenu((prev) => !prev)}
                >
                  <CloseIcon />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="control-labels">
        {labels.map((label, index) => (
          <Label label={label[0]} category={label[1]} key={index} />
        ))}
      </div>
    </>
  );
}

export default ControlSection;
