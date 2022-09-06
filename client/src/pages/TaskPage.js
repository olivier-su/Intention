import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import ToDoList from "../components/task/ToDoList";
import AddTask from "../components/task/AddTask";

const TaskPage = () => {
  const [submitTaskPressed, setSubmitTaskPressed] = useState(0);
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(
    new Date().toLocaleDateString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  );

  const dateHandler = (element) => {
    setFormattedDate(
      element.toLocaleDateString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    );
    setDate(element);
  };
  return (
    <TaskPageContainer>
      <CalendarContainer>
        <Calendar onChange={dateHandler} value={date} />
        <p className="date">Currently Viewing: {formattedDate}</p>
      </CalendarContainer>
      <ContentContainer>
        <ToDoList
          submitTaskPressed={submitTaskPressed}
          formattedDate={formattedDate}
        />
        <AddTask
          date={formattedDate}
          submitTaskPressed={submitTaskPressed}
          setSubmitTaskPressed={setSubmitTaskPressed}
        />
      </ContentContainer>
    </TaskPageContainer>
  );
};
const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  .react-calendar__tile--now {
    background: white;
    color: black;
  }
  .date {
    font-weight: bold;
  }
  .react-calendar__tile--active {
    background: #006edc;
    color: white;
  }
`;

const TaskPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 15px;
`;
export default TaskPage;
