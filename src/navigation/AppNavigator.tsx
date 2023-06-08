import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {ROUTES} from './Routes';
import * as Screens from '../screens';
import {navigationRef} from './NavigationService';
import {useDispatch} from 'react-redux';
import {clearTodo} from '../store/todo';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const dispatch = useDispatch();

  // Clear task that have date not match today
  useEffect(() => {
    dispatch(clearTodo());
  }, [dispatch]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={ROUTES.HOME}
        screenOptions={{
          headerShown: false,
          //   animation: 'slide_from_right',
        }}>
        <Stack.Screen name={ROUTES.HOME} component={Screens.Home} />
        <Stack.Screen name={ROUTES.TODOFORM} component={Screens.ToDoForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
