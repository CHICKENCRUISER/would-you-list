import { configureStore, createSlice } from "@reduxjs/toolkit";

let todosNotDone = createSlice({
  name: "todosNotDone",
  initialState: [],
  reducers: {
    setTodosNotDone(state, action) {
      return action.payload;
    },
  },
});

let todosDone = createSlice({
  name: "todosDone",
  initialState: [],
  reducers: {
    setTodosDone(state, action) {
      return action.payload;
    },
  },
});

export default configureStore({
  reducer: {
    todosNotDone: todosNotDone.reducer,
    todosDone: todosDone.reducer,
  },
});

export const { setTodosNotDone } = todosNotDone.actions;
export const { setTodosDone } = todosDone.actions;
