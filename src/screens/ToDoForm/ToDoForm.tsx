import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {ITodo, IUpdateToDo} from '../../types/todo';
import {addTodo, updateTitleTodo, updateTodo} from '../../store/todo';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import {NavigationService} from '../../navigation/NavigationService';
import moment from 'moment';

export const ToDoForm = props => {
  const {id, prevTitle}: any = useRoute().params ?? {};

  const [title, setTitle] = useState(prevTitle ? prevTitle : '');
  const dispatch = useDispatch();

  const handleAddOrUpdateTodo = () => {
    if (id) {
      if (title.length > 0) {
        const newTodo: ITodo = {
          id: id,
          title: title,
          status: 'ongoing',
        };
        dispatch(updateTitleTodo(newTodo));
        setTitle('');
        NavigationService.goBack();
      }
    } else {
      if (title.length > 0) {
        const newTodo: ITodo = {
          id: Math.random().toString(),
          title: title,
          status: 'ongoing',
          date: moment(new Date()).format('YYYY-MM-DD'),
        };
        dispatch(addTodo(newTodo));
        setTitle('');
        NavigationService.goBack();
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Enter a new todo"
        style={styles.textInput}
      />
      {!(title.length > 0) ? <Text>Please type title.</Text> : null}
      <Button title={id ? 'Update' : 'Add'} onPress={handleAddOrUpdateTodo} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 12,
  },
  textInput: {
    height: 36,
    borderWidth: 1,
    borderRadius: 12,
    paddingLeft: 8,
    borderColor: '#D7C0D2',
  },
});
