import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  InitialTodosStateType,
  toggleTodo,
} from "../store/todosSlice";
import React from "react";
import { RootState } from "../store/store";
import InputBase from "@mui/material/InputBase";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import PaperWrapper from "./PaperWrapper";
import { inputStyles } from "../styles/inputContainer.styles";
import { v1 } from "uuid";
import CloseIcon from "@mui/icons-material/Close";

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
  const theme = useTheme();
  const [inputValue, setValue] = React.useState<string>("");
  const [isAnyTodos, setIsAnyTodos] = React.useState<boolean>(false);
  const [isChecked, setIsChecked] = React.useState<boolean>(false);
  const { todos, checkedState } = useSelector<RootState, InitialTodosStateType>(
    (state) => state.todos
  );
  const dispatch = useDispatch();
  const [isCloseIcon, setIsCloseIcon] = React.useState(
    [...Array(todos.length)].fill(false)
  );

  const handleOnChange = (position: number) => {
    dispatch(toggleTodo(position));
  };

  // const handleCloseIcon = (position: number) => {
  //   const updatedClosedIconState = isCloseIcon.map((item, index) =>
  //     index === position ? !item : item
  //   );
  //   setCheckedState(updatedClosedIconState);
  // };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleEnterSubmit = (event: React.KeyboardEvent) => {
    if (inputValue.trim() && event.key === "Enter") {
      dispatch(addTodo({ title: inputValue, id: v1(), status: "all" }));
      setValue("");
    }
  };

  const handleAllSetChecked = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <>
      <PaperWrapper height="65.59px">
        <IconButton onClick={handleAllSetChecked}>
          <ExpandMoreIcon
            fontSize="large"
            sx={{
              color: isChecked ? "#737373" : theme.palette.secondary.main,
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
      </PaperWrapper>

      {todos.length > 0 &&
        todos.map((todo, index) => {
          return (
            <div key={todo.id}>
              <PaperWrapper
                height="58.8px"
                // setIsCloseIcon={setIsCloseIcon}
                // position={index}
                // todoId={todo.id}
              >
                <Checkbox
                  checked={checkedState[index]}
                  onChange={() => handleOnChange(index)}
                  icon={
                    <Box
                      sx={[
                        inputStyles.checkboxIcon,
                        { border: `1px solid ${theme.palette.secondary.main}` },
                      ]}
                    ></Box>
                  }
                  checkedIcon={
                    <Box sx={inputStyles.checkboxIcon}>
                      <CheckIcon htmlColor="#55d798" />
                    </Box>
                  }
                />
                <Typography
                  sx={[
                    inputStyles.todoText,
                    {
                      color:
                        checkedState[index] === true
                          ? theme.palette.secondary.main
                          : theme.palette.primary.main,
                      textDecoration:
                        checkedState[index] === true ? "line-through" : "none",
                    },
                  ]}
                >
                  {todo.title}
                </Typography>
                {/* <CloseIcon
                className="closeIcon"
                htmlColor={theme.palette.info.main}
                sx={{
                  position: "absolute",
                  right: "20px",
                  width: "23px",
                  height: "23px",
                  visibility: isCloseIcon ? "visible" : "hidden",
                  "&:hover": {
                    color: theme.palette.info.dark,
                  },
                }}
              /> */}
              </PaperWrapper>
            </div>
          );
        })}
    </>
  );
};

export default InputContainer;
