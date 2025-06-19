import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state,action) => {
      state.value += 1;
    },
    getTodo: (state, action) => {},
    deleteTodo: (state) => {
      state.value -= 1;
    },
    updateTodo: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {addTodo, getTodo,updateTodo,deleteTodo} = todosSlice.actions;

export default todosSlice.reducer;
