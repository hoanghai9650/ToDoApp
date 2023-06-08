import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import TodoList from './ToDoList';
import {FloatButton} from './FloatButton';

import {ROUTES} from '../../navigation';
import {NavigationService} from '../../navigation/NavigationService';

export const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TodoList />
      <FloatButton
        onPress={() => NavigationService.navigate(ROUTES.TODOFORM)}
      />
    </SafeAreaView>
  );
};
