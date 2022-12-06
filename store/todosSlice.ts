import { createSlice } from "@reduxjs/toolkit";

export type TTodoStatus = "all" | "completed" | "active";

export type TTodo = {
  id: string;
  status: TTodoStatus;
  title: string;
};

const initialState: TTodo[] = [];

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    toggleTodo: (state, action) => {},
    deleteTodo: (state, action) => {
      const todoToDelete = state.find((todo) => todo.id === action.payload);
      if (todoToDelete) {
        const deleteIndex = state.indexOf(todoToDelete);
        state.splice(deleteIndex, 1);
      }
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo } = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
