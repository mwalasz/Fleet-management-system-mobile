import * as React from 'react';
import { View, Text, Button } from 'react-native';

const RecordingScreen = ({ route, navigation }) => {
    const { id } = route.params;

    return (
        <View>
            <Text>Recording screen</Text>
            <Text>{`Id of selected car to use: ${id}`}</Text>
        </View>
    );
};

export default RecordingScreen;
