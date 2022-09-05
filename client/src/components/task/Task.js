import { FiTrash2 } from "react-icons/fi";
import styled from "styled-components";

const Task = ({ task, deleteTaskPressed, setDeleteTaskPressed }) => {
  const handleDeleteTask = () => {
    fetch("/api/task", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: task._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setDeleteTaskPressed(deleteTaskPressed + 1);
      })
      .catch((err) => console.log(err));
  };
  return (
    <TaskContainer>
      <p className="task">{task.task}</p>
      <FiTrash2 className="trash" onClick={handleDeleteTask} />
    </TaskContainer>
  );
};

const TaskContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border: 2px solid black;
  margin: 5px 0;
  padding: 5px;
  gap: 15px;
  max-width: 300px;
  .task {
    max-width: 300px;
    word-wrap: break-word;
  }
  .trash {
    cursor: pointer;
  }
`;

export default Task;
