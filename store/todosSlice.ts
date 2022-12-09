import { createSlice } from "@reduxjs/toolkit";

export type TTodoStatus = "all" | "completed" | "active";

export type TTodo = {
  id: string;
  status: TTodoStatus;
  title: string;
};

export type InitialTodosStateType = {
  todos: TTodo[];
  checkedState: boolean[];
};

const initialState: InitialTodosStateType = {
  todos: [],
  checkedState: [],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      state.checkedState.push(false);
    },
    toggleTodo: (state, action) => {
      const updatedCheckedState = state.checkedState.map((item, index) =>
        index === action.payload ? !item : item
      );
      state.checkedState = updatedCheckedState;
    },
    deleteTodo: (state, action) => {
      const updatedTodos = state.todos.filter(
        (todo, index) => index !== action.payload
      );
      state.todos = updatedTodos;
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo } = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
