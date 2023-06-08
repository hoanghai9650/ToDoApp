export interface ITodo {
  id: string;
  title: string;
  status: string;
  date: string;
}
export interface IUpdateToDo {
  id: string;
  status: string;
}
export interface IUpdateTitleToDo {
  id: string;
  title: string;
}

export interface ITodoState {
  todo: ITodo[];
}

export interface IRootState {
  todos: ITodoState;
}
