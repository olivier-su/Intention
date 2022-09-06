import { useEffect, useState, useContext } from "react";
import { CircularProgress } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import Task from "./Task";
import { TaskContext } from "../../context/TaskContext";
import styled from "styled-components";

const ToDoList = ({ formattedDate, submitTaskPressed, homePage }) => {
  const [task, setTask] = useState(null);
  const { user } = useAuth0();
  const { deleteTaskPressed } = useContext(TaskContext);

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
    <ToDoListContainer>
      {homePage ? (
        <p className="date">Tasks for today</p>
      ) : (
        <p className="date">Tasks for {formattedDate}</p>
      )}

      {task !== null ? (
        task.length > 0 ? (
          <>
            {task.map((element) => {
              return <Task task={element} key={element._id} />;
            })}
          </>
        ) : (
          <p className="date">You have no tasks</p>
        )
      ) : (
        <CircularProgress />
      )}
    </ToDoListContainer>
  );
};

const ToDoListContainer = styled.div`
  .date {
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

export default ToDoList;
