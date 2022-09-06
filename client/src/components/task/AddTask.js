import styled from "styled-components";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AddTask = ({ date, submitTaskPressed, setSubmitTaskPressed }) => {
  const { user } = useAuth0();
  const [task, setTask] = useState("");

  const handleSubmitTask = (e, name, calories) => {
    e.preventDefault();
    //The calories that we get from the input is a string so we typecast it to a number
    calories = Number(calories);

    fetch("/api/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task,
        date,
        user: `${user.email}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSubmitTaskPressed(submitTaskPressed + 1);
        setTask("");
      })
      .catch((err) => console.log(err));
  };
  return (
    <AddTaskContainer>
      <p className="addTask">Add Task</p>
      <FormWrapper onSubmit={(e) => handleSubmitTask(e, task)}>
        <textarea
          value={task}
          required={true}
          placeholder="Write your task here!"
          onChange={(e) => {
            setTask(e.target.value);
          }}
          maxLength="50"
        />
        <input className="submitButton" type="submit" value="Add" />
      </FormWrapper>
    </AddTaskContainer>
  );
};

const AddTaskContainer = styled.div`
  .addTask {
    text-align: center;
    font-weight: bold;
  }
`;

const FormWrapper = styled.form`
  display: flex;
  margin-top: 5px;
  flex-direction: column;
  gap: 5px;
  textarea {
    border-radius: 3%;
    width: 300px;
    height: 40px;
  }
  .submitButton {
    background-color: #ffe8d6;
    border-radius: 5%;
    border-width: 1px;
  }
`;
export default AddTask;
