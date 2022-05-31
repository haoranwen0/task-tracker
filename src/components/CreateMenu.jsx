import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TextField, MenuItem } from "@mui/material";
import { CreateButton } from "../mui/Button";
import useCreateTask from "../hooks/useCreateTask";
import { API } from "aws-amplify";

function CreateMenu({ handleCreateTask }) {
  const [
    task,
    addNotes,
    setAddNotes,
    handleTaskChange,
    handleDeadlineSelect,
    onCreateTask,
  ] = useCreateTask({
    title: "",
    deadline: null,
    label: "default",
    notes: "",
  });

  React.useEffect(() => {
    API.get("endpoints", "/canvas")
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="create-task-menu">
      <div className="create-task-title">
        <input
          name="title"
          type="text"
          placeholder="title"
          className="create-task-title-input"
          value={task.title}
          onChange={handleTaskChange}
        />
      </div>
      <div className="create-task-section">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Deadline"
            value={task.deadline}
            name="deadline"
            onChange={handleDeadlineSelect}
          />
        </LocalizationProvider>
      </div>
      <div className="create-task-section">
        <TextField
          select
          value={task.label}
          name="label"
          onChange={handleTaskChange}
        >
          <MenuItem value="default" disabled>
            Select Label
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
          <MenuItem value={40}>Forty</MenuItem>
          <MenuItem value={50}>Fifty</MenuItem>
        </TextField>
      </div>
      <div className="create-task-section">
        <label htmlFor="notes" onClick={() => setAddNotes(true)}>
          Add Notes
        </label>
      </div>
      {addNotes && (
        <div className="create-task-section">
          <textarea
            name="notes"
            value={task.notes}
            className="create-task-notes"
            autoFocus
            onChange={handleTaskChange}
          />
        </div>
      )}
      <div className="create-task-section flex flex-end">
        <CreateButton onClick={onCreateTask}>Create Task</CreateButton>
      </div>
      <div className="create-menu-close" onClick={handleCreateTask}>
        <CloseIcon />
      </div>
    </div>
  );
}

export default CreateMenu;
