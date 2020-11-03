import React from "react";
import { screenNames, appName } from "../utils/constans";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SettingsScreen from "../screens/settings/SettingsScreen";
import InformationScreen from "../screens/information/InformationScreen";
import { RecordingStackNavigator } from "../navigation/StackNavigators";

const Tab = createMaterialTopTabNavigator();

const HomeTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name={screenNames.recording}
                component={RecordingStackNavigator}
            />
            <Tab.Screen
                name={screenNames.information}
                component={InformationScreen}
            />
            <Tab.Screen
                name={screenNames.settings}
                component={SettingsScreen}
            />
        </Tab.Navigator>
    );
};

export default HomeTabNavigator;
