import * as React from "react";
import { View, Text, Button } from "react-native";
import { screenNames } from "../../utils/constans";

const VehiclesScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Vehicles screen</Text>
            <Button
                title={"Nagrywanie"}
                onPress={() => navigation.navigate(screenNames.recording)}
            />
        </View>
    );
};

export default VehiclesScreen;
