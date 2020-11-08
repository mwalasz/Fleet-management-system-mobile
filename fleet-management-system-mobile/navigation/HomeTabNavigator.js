import React from 'react';
import { screenInfo } from '../utils/constans';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SettingsScreen from '../screens/settings/SettingsScreen';
import InformationScreen from '../screens/information/InformationScreen';
import { RecordingStackNavigator } from '../navigation/StackNavigators';

const Tab = createMaterialTopTabNavigator();

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

export default HomeTabNavigator;
