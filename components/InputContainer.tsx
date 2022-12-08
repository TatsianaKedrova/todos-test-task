import { useDispatch, useSelector } from "react-redux";
import { addTodo, TTodo } from "../store/todosSlice";
import React from "react";
import { RootState } from "../store/store";
import InputBase from "@mui/material/InputBase";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IconButton, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    color: theme.palette.primary.main,
    fontSize: "24px",
    fontFamily: "inherit",
    marginLeft: "10px",
    "&::placeholder": {
      color: theme.palette.secondary.main,
      fontStyle: "italic",
    },
  },
}));

const InputContainer = () => {
  const [inputValue, setValue] = React.useState<string>("");
  const [isAnyTodos, setIsAnyTodos] = React.useState<boolean>(false);
  const [isChecked, setIsChecked] = React.useState<boolean>(false);
  const todos = useSelector<RootState, TTodo[]>((state) => state.todos);
  const dispatch = useDispatch();

  const theme = useTheme();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleEnterSubmit = (event: React.KeyboardEvent) => {
    if (inputValue.trim() && event.key === "Enter") {
      dispatch(addTodo(inputValue));
      setValue("");
    }
  };

  const handleSetChecked = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <>
      <Paper
        elevation={3}
        square={true}
        sx={{
          p: "16px 16px 16px 0px",
          display: "flex",
          alignItems: "center",
          width: 550,
          height: "65.59px",
        }}
      >
        <IconButton onClick={handleSetChecked}>
          <ExpandMoreIcon
            fontSize="large"
            sx={{
              color: isChecked
                ? theme.palette.primary.main
                : theme.palette.secondary.main,
              visibility: todos.length ? "visible" : "hidden",
            }}
          />
        </IconButton>
        <StyledInputBase
          placeholder="What needs to be done"
          required
          type="text"
          onChange={handleInput}
          onKeyDown={handleEnterSubmit}
          value={inputValue}
        />
      </Paper>
    </>
  );
};

export default InputContainer;
