import React from "react";

import Label from "./Label";

function ControlSection({ title, create, labels }) {
  return (
    <>
      <div className="control-guide">
        <span className="title">{title}</span>
        {create && (
          <span className="create hover-underline-animation">Create</span>
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
