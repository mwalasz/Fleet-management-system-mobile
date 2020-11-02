import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./screens/Home/HomeScreen";
import LoginScreen from "./screens/login/LoginScreen";
import { screenNames, appName } from "./utils/constans";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={screenNames.login}
          component={LoginScreen}
          options={{ title: appName }}
        />
        <Stack.Screen name={screenNames.home} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;