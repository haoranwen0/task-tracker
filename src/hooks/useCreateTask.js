import { useState } from "react";
import { API } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import { useSelector } from "react-redux";

export default function useCreateTask(initialValue) {
  const [task, updateTask] = useState(initialValue);
  const [addNotes, setAddNotes] = useState(false);
  const user = useSelector((state) => state.user.value);

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

  const onCreateTask = async () => {
    const newTask = {
      userId: user.username,
      deadline: task.deadline,
      notes: task.notes,
      label: task.label,
      progress: 0,
      title: task.title,
    };
    try {
      const submitTask = await API.graphql({
        query: mutations.createTask,
        variables: { input: newTask },
      });

      console.log(submitTask);
    } catch (e) {
      console.log(e);
    }
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
