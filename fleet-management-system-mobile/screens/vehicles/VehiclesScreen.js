import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { screenInfo } from '../../utils/constans';

const VehiclesScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Vehicles screen</Text>
            <Button
                title={'Nagrywanie'}
                onPress={() => navigation.navigate(screenInfo.recording.name)}
            />
        </View>
    );
};

export default VehiclesScreen;
