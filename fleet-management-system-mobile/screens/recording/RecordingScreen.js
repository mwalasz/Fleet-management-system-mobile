import React, { useEffect, useState } from 'react';
import { Alert, Text, View, StyleSheet } from 'react-native';
import backHandler from '../../handlers/backHandler';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const RecordingScreen = ({ route, navigation }) => {
    const { id } = route.params;
    const [lastLocation, setLastLocation] = useState(null);
    const [geocode, setGeocode] = useState(null);
    const [error, setError] = useState('');

    // useEffect(() => backHandler({ goBack: navigation.goBack }), []);

    getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            setError('Permission to access location was denied');
        }

        let location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Low,
        });
        const { latitude, longitude } = location.coords;
        getGeocodeAsync({ latitude, longitude });
        setLastLocation({ latitude, longitude });
    };

    getGeocodeAsync = async (location) => {
        let geocode = await Location.reverseGeocodeAsync(location);
        setGeocode(geocode);
    };

    useEffect(() => {
        getLocationAsync();
    }, []);

    return (
        <View styles={styles.container}>
            {/* <Text>Recording screen</Text>
            <Text>{`Id of selected car to use: ${id}`}</Text> */}

            {/* <View style={styles.button}>
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
            </View> */}
            <View style={styles.mapsContainer}>
                <MapView
                    showsCompass
                    showsUserLocation
                    showsMyLocationButton
                    provider={PROVIDER_GOOGLE}
                    style={styles.maps}
                    region={{
                        latitude: lastLocation
                            ? lastLocation.latitude
                            : 37.78825,
                        longitude: lastLocation
                            ? lastLocation.longitude
                            : -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            </View>
            <View style={styles.locationTextContainer}>
                <Text style={styles.locationText}>
                    <Text style={styles.title}>Current position: </Text>
                    {lastLocation
                        ? `latitude: ${lastLocation.latitude}, longtitude: ${lastLocation.longitude}`
                        : ''}
                </Text>
                <Button title={'Update'} onPress={() => {}} />
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
    locationText: {
        fontWeight: 'bold',
    },
    locationTextContainer: {
        flex: 1,
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'center',
        bottom: -600,
    },
});

export default RecordingScreen;
