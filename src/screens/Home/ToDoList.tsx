import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';

import TodoItem from './TodoItem';
import {ITodo, IUpdateToDo} from '../../types/todo';
import {RootState} from '../../store/store';
import {addTodo, deleteTodo, updateTodo} from '../../store/todo';
import moment from 'moment';
import {isEmpty} from 'lodash';
const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todo.todos);

  const dispatch = useDispatch();

  const handleUpdateTodoStatus = useCallback(
    (id: string, status: string) => {
      const updatedTodo: IUpdateToDo = {
        id,
        status,
        //   title: '',
      };
      dispatch(updateTodo(updatedTodo));
    },
    [dispatch],
  );

  const handleDeleteTodo = useCallback(
    (id: string) => {
      dispatch(deleteTodo(id));
    },
    [dispatch],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Today: {moment(new Date()).format('MM/DD')}
      </Text>
      {!isEmpty(todos) ? (
        <FlatList
          data={todos}
          renderItem={({item}) => (
            <TodoItem
              todo={item}
              onUpdateStatus={handleUpdateTodoStatus}
              onDelete={handleDeleteTodo}
            />
          )}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={styles.emptyTaskStyle}>No task for today.</Text>
      )}
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  // contentContainerStyle: {
  //   paddingHorizontal: 12,
  // },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  emptyTaskStyle: {
    marginTop: 24,
  },
});
