import React, {memo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {ITodo} from '../../types/todo';
import {ImagePath} from '../../assets';
import {NavigationService} from '../../navigation/NavigationService';
import {ROUTES} from '../../navigation';

interface Props {
  todo: ITodo;
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = (props: Props) => {
  const {todo, onUpdateStatus, onDelete} = props;

  const handleUpdateStatus = () => {
    const newStatus = todo.status === 'ongoing' ? 'completed' : 'ongoing';
    onUpdateStatus(todo.id, newStatus);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  let today = new Date().getDate();
  let anotherday = new Date(todo.date).getDate();
  console.log(anotherday === today, 'anotherday');

  const CheckBox = ({
    checked,
    onPress,
  }: {
    checked: boolean;
    onPress: () => void;
  }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={[
            styles.checkBoxStyle,
            checked ? styles.checkedBoxStyle : null,
          ]}>
          {checked ? (
            <Image source={ImagePath.icon_check} style={styles.iconChecked} />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <TouchableOpacity
      onPress={() =>
        NavigationService.navigate(ROUTES.TODOFORM, {
          id: todo.id,
          prevTitle: todo.title,
        })
      }>
      <View style={styles.container}>
        <CheckBox
          checked={todo.status === 'completed' ? true : false}
          onPress={handleUpdateStatus}
        />

        <View
          style={[
            styles.taskCard,
            todo.status === 'completed' ? styles.completedTask : null,
          ]}>
          <Text
            style={[
              styles.taskTitle,
              todo.status === 'completed' ? styles.completedTaskTitle : null,
            ]}>
            {todo.title}
          </Text>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete()}>
            <Image source={ImagePath.icon_trash} style={styles.iconTrash} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',

    width: '100%',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    marginBottom: 5,
  },
  timestamp: {
    fontSize: 12,
    marginBottom: 5,
  },

  taskCard: {
    flexDirection: 'row',
    flex: 9,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    marginLeft: 8,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.75,
    elevation: 8,
  },
  completedTask: {
    backgroundColor: '#D7C0D2',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '90%',
  },
  completeButton: {
    backgroundColor: '#5cb85c',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  deleteButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  iconChecked: {
    width: 16,
    height: 16,
  },
  checkBoxStyle: {
    width: 24,
    height: 24,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#D7C0D2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBoxStyle: {
    backgroundColor: '#D7C0D2',
    borderWidth: 0,
  },
  iconTrash: {
    width: 20,
    height: 20,
  },
  completedTaskTitle: {
    textDecorationLine: 'line-through',
    textDecorationColor: '#F7C8DC',
  },
});

export default memo(TodoItem);
