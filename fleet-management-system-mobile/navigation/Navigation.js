import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { screenInfo } from '../utils/constans';
import VehiclesScreen from '../screens/vehicles/VehiclesScreen';
import RecordingScreen from '../screens/recording/RecordingScreen';
import LoginScreen from '../screens/login/LoginScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import InformationScreen from '../screens/information/InformationScreen';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const HomeTabNavigator = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                inactiveTintColor: '#000',
                activeTintColor: '#2196F3',
                tabStyle: { marginTop: 15, paddingBottom: 5 },
            }}
        >
            <Tab.Screen
                name={screenInfo.recording.name}
                options={{
                    title: screenInfo.recording.title,
                    marginTop: 20,
                }}
                component={RecordingStackNavigator}
            />
            <Tab.Screen
                name={screenInfo.information.name}
                options={{ title: screenInfo.information.title }}
                component={InformationScreen}
            />
            <Tab.Screen
                name={screenInfo.settings.name}
                options={{ title: screenInfo.settings.title }}
                component={SettingsScreen}
            />
        </Tab.Navigator>
    );
};

const RecordingStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={screenInfo.vehicles.name}
                options={{
                    title: screenInfo.vehicles.title,
                    headerShown: false,
                }}
                component={VehiclesScreen}
            />
            <Stack.Screen
                name={screenInfo.recording.name}
                options={{
                    title: screenInfo.recording.title,
                    headerShown: false,
                }}
                component={RecordingScreen}
            />
        </Stack.Navigator>
    );
};

const MainStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={LoginScreen}>
            <Stack.Screen
                name={screenInfo.login.name}
                options={{ title: screenInfo.login.title }}
                component={LoginScreen}
            />
            <Stack.Screen
                name={screenInfo.home.name}
                options={{
                    headerShown: false,
                    title: screenInfo.home.title,
                }}
                component={HomeTabNavigator}
            />
        </Stack.Navigator>
    );
};

export { HomeTabNavigator, RecordingStackNavigator, MainStackNavigator };
