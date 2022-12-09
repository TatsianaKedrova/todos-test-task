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
      const todoToDelete = state.todos.find(
        (todo) => todo.id === action.payload
      );
      if (todoToDelete) {
        const deleteIndex = state.todos.indexOf(todoToDelete);
        state.todos.splice(deleteIndex, 1);
      }
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo } = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
