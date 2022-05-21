import React from "react";

import ControlSection from "./ControlSection";

import "../css/Control.css";

function Control() {
  return (
    <div className="control-wrapper">
      <div className="control">
        <ControlSection
          title="Label"
          create={true}
          labels={[
            ["View All", "default"],
            ["6.002", "custom"],
            ["6.003", "custom"],
            ["6.170", "custom"],
            ["21G.011", "custom"],
          ]}
        />
        <ControlSection
          title="Views"
          create={false}
          labels={[
            ["List", "default"],
            // ["Day", "default"],
            // ["Week", "default"],
            // ["Month", "default"],
          ]}
        />
      </div>
    </div>
  );
}

export default Control;
