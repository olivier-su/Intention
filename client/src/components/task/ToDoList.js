import { useEffect, useState } from "react";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import Task from "./Task";

const ToDoList = ({
  formattedDate,
  deleteTaskPressed,
  submitTaskPressed,
  setDeleteTaskPressed,
}) => {
  const [task, setTask] = useState(null);
  const { user } = useAuth0();

  useEffect(() => {
    fetch("/api/get-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: `${user.email}`, date: formattedDate }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTask(data.result);
      });
  }, [formattedDate, submitTaskPressed, deleteTaskPressed, user.email]);

  return (
    <div>
      <p>Tasks for {formattedDate}</p>
      {task !== null ? (
        task.length > 0 ? (
          <>
            {task.map((element) => {
              return (
                <Task
                  task={element}
                  key={element._id}
                  deleteTaskPressed={deleteTaskPressed}
                  setDeleteTaskPressed={setDeleteTaskPressed}
                />
              );
            })}
          </>
        ) : (
          <p>Add tasks</p>
        )
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default ToDoList;
