import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { screenNames, appName } from "../utils/constans";
import LoginScreen from "../screens/login/LoginScreen";
import HomeTabNavigator from "./HomeTabNavigator";
import VehiclesScreen from "../screens/vehicles/VehiclesScreen"
import RecordingScreen from "../screens/recording/RecordingScreen"

const Stack = createStackNavigator();

// Starting stack
const MainStackNavigator = () => {
    return(
        <Stack.Navigator initialRouteName={LoginScreen}>
            <Stack.Screen 
                name={screenNames.login}
                component={LoginScreen}
                options={{ title: appName }}
            />
            <Stack.Screen
                name={screenNames.welcomeHome} 
                component={HomeTabNavigator} 
            />
        </Stack.Navigator>
    );
};

// Stack used in tab "recording"
const RecordingStackNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name={screenNames.vehicles} 
                component={VehiclesScreen} 
            />
            <Stack.Screen
                name={screenNames.recording} 
                component={RecordingScreen} 
            />
        </Stack.Navigator>
    );
};

export { MainStackNavigator, RecordingStackNavigator };