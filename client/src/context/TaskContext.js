import { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [deleteTaskPressed, setDeleteTaskPressed] = useState(0);

  return (
    <TaskContext.Provider value={{ deleteTaskPressed, setDeleteTaskPressed }}>
      {children}
    </TaskContext.Provider>
  );
};
