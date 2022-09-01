import { createContext, useState } from "react";

export const AddFoodContext = createContext();

export const AddFoodProvider = ({ children }) => {
  const [submitFoodPressed, setSubmitFoodPressed] = useState(0);

  return (
    <AddFoodContext.Provider
      value={{ submitFoodPressed, setSubmitFoodPressed }}
    >
      {children}
    </AddFoodContext.Provider>
  );
};
