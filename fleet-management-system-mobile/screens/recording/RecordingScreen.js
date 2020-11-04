import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import backHandler from '../../handlers/backHandler';

const RecordingScreen = ({ route, navigation }) => {
    const { id } = route.params;

    useEffect(() => backHandler({ goBack: navigation.goBack }), []);

    return (
        <View>
            <Text>Recording screen</Text>
            <Text>{`Id of selected car to use: ${id}`}</Text>
        </View>
    );
};

export default RecordingScreen;
