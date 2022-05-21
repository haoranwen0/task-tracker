import { useState } from "react";

export default function useCreateTask(initialValue) {
  const [task, updateTask] = useState(initialValue);
  const [addNotes, setAddNotes] = useState(false);

  const handleTaskChange = (e) => {
    var { name, value } = e.target;
    updateTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeadlineSelect = (dateTime) => {
    updateTask((prevState) => ({
      ...prevState,
      deadline: dateTime,
    }));
  };

  const onCreateTask = () => {
    console.log(task);
  };

  return [
    task,
    addNotes,
    setAddNotes,
    handleTaskChange,
    handleDeadlineSelect,
    onCreateTask,
  ];
}
