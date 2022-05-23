import React, { useState } from "react";
import { ChromePicker } from "react-color";
import CloseIcon from "@mui/icons-material/Close";
import { CreateButton } from "../mui/Button";
import { labelColorSelections } from "../constants/colors";

import Label from "./Label";

function ControlSection({ title, create, labels }) {
  const [color, updateColor] = useState("#da3f68");
  const [showMenu, updateShowMenu] = useState(false);
  const [showColorPicker, updateShowColorPicker] = useState(false);

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
                <div className="control-create-menu-section color-section">
                  {labelColorSelections.map((hex, index) => (
                    <div
                      className="control-color-selection"
                      style={{ backgroundColor: hex }}
                      key={index}
                    />
                  ))}
                  <div className="color-picker-wrapper">
                    <div
                      className="control-color-selection custom-color"
                      onClick={() => updateShowColorPicker((prev) => !prev)}
                      style={{
                        backgroundColor: color,
                      }}
                    ></div>
                    {showColorPicker && (
                      <div className="color-picker">
                        <ChromePicker
                          onChange={(color, event) => {
                            console.log(color);
                            updateColor(color.hex);
                          }}
                          color={color}
                          disableAlpha={true}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="control-create-menu-section">
                  <CreateButton>Create Label</CreateButton>
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
