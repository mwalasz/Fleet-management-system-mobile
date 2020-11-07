import React, { useEffect } from 'react';
import { Alert, Text, View, StyleSheet } from 'react-native';
import backHandler from '../../handlers/backHandler';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const RecordingScreen = ({ route, navigation }) => {
    const { id } = route.params;

    useEffect(() => backHandler({ goBack: navigation.goBack }), []);

    return (
        <View styles={styles.container}>
            <Text>Recording screen</Text>
            <Text>{`Id of selected car to use: ${id}`}</Text>

            <View style={styles.button}>
                <Button
                    title={'Start recording'}
                    titleStyle={{ marginRight: 10 }}
                    iconRight
                    icon={
                        <Icon name="hourglass-start" size={15} color="white" />
                    }
                    containerStyle={{ alignSelf: 'stretch' }}
                    onPress={() => {
                        Alert.alert('Start!');
                    }}
                />
            </View>
            <View style={styles.mapsContainer}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.maps}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        position: 'absolute',
    },
    maps: {
        flex: 1,
    },
    mapsContainer: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    maps: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default RecordingScreen;
