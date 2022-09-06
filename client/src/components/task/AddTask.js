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
    <div>
      <p>Add Task</p>
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
        <input type="submit" value="Add" />
      </FormWrapper>
    </div>
  );
};

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;
export default AddTask;
