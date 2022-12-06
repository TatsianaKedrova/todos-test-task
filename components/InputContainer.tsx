import { useDispatch, useSelector } from "react-redux";
import { addTodo, TTodo } from "../store/todosSlice";
import React from "react";
import styles from "../styles/inputContainer.module.css";
import { RootState } from "../store/store";

const InputContainer = () => {
  const [inputValue, setValue] = React.useState("");
  const todos = useSelector<RootState, TTodo[]>((state) => state.todos);
  const dispatch = useDispatch();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleEnterSubmit = (event: React.KeyboardEvent) => {
    if (inputValue.trim() && event.key === "Enter") {
      dispatch(addTodo(inputValue));
    }
  };

  console.log("value: ", inputValue);
  console.log("todos: ", todos);

  return (
    <input
      type="text"
      onChange={handleInput}
      onKeyDown={handleEnterSubmit}
      value={inputValue}
      className={styles.inputField}
      placeholder={"What needs to be done?"}
    />
  );
};

export default InputContainer;
