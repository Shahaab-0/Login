import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Src/Screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {store} from './Src/store/store';
import {Provider} from 'react-redux';
import MainMenu from './Src/Screens/MainMenu';

const Stack = createStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="MainMenu" component={MainMenu} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
