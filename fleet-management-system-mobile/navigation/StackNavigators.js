import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screenInfo } from '../utils/constans';
import LoginScreen from '../screens/login/LoginScreen';
import HomeTabNavigator from './HomeTabNavigator';
import VehiclesScreen from '../screens/vehicles/VehiclesScreen';
import RecordingScreen from '../screens/recording/RecordingScreen';

const Stack = createStackNavigator();

// Starting stack
const MainStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={LoginScreen}>
            <Stack.Screen
                name={screenInfo.login.title}
                options={{ title: screenInfo.login.title }}
                component={LoginScreen}
            />
            <Stack.Screen
                name={screenInfo.home.name}
                options={{ title: screenInfo.home.title }}
                component={HomeTabNavigator}
            />
        </Stack.Navigator>
    );
};

// Stack used in tab "recording"
const RecordingStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={screenInfo.vehicles.name}
                options={{ title: screenInfo.vehicles.title }}
                component={VehiclesScreen}
            />
            <Stack.Screen
                name={screenInfo.recording.name}
                options={{ title: screenInfo.recording.title }}
                component={RecordingScreen}
            />
        </Stack.Navigator>
    );
};

export { MainStackNavigator, RecordingStackNavigator };
