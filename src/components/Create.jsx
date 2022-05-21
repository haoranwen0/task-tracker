import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

import CreateMenu from "./CreateMenu";

import "../css/Create.css";

function Create() {
  const [showMenu, updateShowMenu] = useState(false);

  const handleCreateTask = () => {
    updateShowMenu((prev) => !prev);
  };

  return (
    <div className="create-task-wrapper icon">
      <div className="create-task" onClick={handleCreateTask}>
        <AddIcon fontSize="large" />
      </div>
      {showMenu && <CreateMenu handleCreateTask={handleCreateTask} />}
    </div>
  );
}

export default Create;
