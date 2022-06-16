import React from "react";

import ControlSection from "./ControlSection";

function Control() {
  return (
    <div className="control-wrapper">
      <div className="control">
        <ControlSection
          title="Label"
          create={true}
          labels={[
            ["View All", "default"],
            ["6.002", "default"],
            ["6.003", "default"],
            ["6.170", "default"],
            ["21G.011", "default"],
          ]}
        />
        <ControlSection
          title="Views"
          create={false}
          labels={[["List", "default"]]}
        />
      </div>
    </div>
  );
}

export default Control;
