import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ITodo, IUpdateToDo} from '../../types/todo';

interface TodoState {
  todos: ITodo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      console.log(action.payload);
      state.todos.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<IUpdateToDo>) => {
      const {id, status} = action.payload;
      const todo = state.todos.find(item => item.id === id);
      if (todo) {
        todo.status = status;
      }
    },
    updateTitleTodo: (state, action: PayloadAction<ITodo>) => {
      const {id, title, status} = action.payload;
      const todo = state.todos.find(item => item.id === id);
      if (todo) {
        todo.title = title;
        todo.status = status;
      }
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    clearTodo: state => {
      state.todos = state.todos.filter(
        item => new Date().getDate() === new Date(item.date).getDate(),
      );
    },
  },
});

export const {addTodo, updateTodo, deleteTodo, updateTitleTodo, clearTodo} =
  todoSlice.actions;

export default todoSlice.reducer;
