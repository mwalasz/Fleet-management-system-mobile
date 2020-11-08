import React, { useEffect, useState } from 'react';
import { Alert, Text, View, StyleSheet } from 'react-native';
import backHandler from '../../handlers/backHandler';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Dimensions } from 'react-native';

class RecordingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.locationObj = null;
        this.state = {
            currentLatitude: null,
            currentLongitude: '',
            locationHistory: [],
            error: '',
            isRecording: false,
        };
    }

    validatePermissions = async () => {
        // let { status } = await Permissions.askAsync(Permissions.LOCATION);
        let { status } = await Permissions.getAsync(Permissions.LOCATION);

        console.log('status');
        console.log(status);

        if (status !== 'granted') {
            let { newStatus } = await Permissions.askAsync(
                Permissions.LOCATION
            );

            if (newStatus !== 'granted') {
                console.log('Brak pozwoleń!');

                return false;
            }
        }

        return true;
    };

    start = async () => {
        if (await this.validatePermissions()) {
            this.locationObj = await Location.watchPositionAsync(
                {
                    accuracy: Location.LocationAccuracy.High,
                    distanceInterval: 5,
                    timeInterval: 2000,
                },
                (newLocation) => {
                    console.log('newLocation');
                    console.log(newLocation);
                    let { latitude, longitude } = newLocation.coords;

                    this.setState({ latitude, longitude });
                    this.setState((prevState) => ({
                        locationHistory: [
                            ...prevState.locationHistory,
                            { latitude, longitude },
                        ],
                    }));
                }
            );
        }

        this.setState({ error: 'No permission granted!' });
    };

    startRecording = async () => {
        await this.start();
        this.setState({ isRecording: true });
    };

    stopRecording = async () => {
        if (this.state.isRecording && this.locationObj !== null) {
            this.locationObj.remove();
            this.setState({ isRecording: false });
        }
    };

    render() {
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
                        // region={{
                        //     latitude: this.state.location
                        //         ? // ? parseFloat(this.state.latitude)
                        //           this.state.latitude
                        //         : 37.78825,
                        //     longitude: this.state.location
                        //         ? this.state.longitude
                        //         : -122.4324,
                        //     latitudeDelta: 0.0922,
                        //     longitudeDelta: 0.0421,
                        // }}
                    />
                </View>
                <View style={styles.locationTextContainer}>
                    <Text style={styles.locationText}>
                        {this.state.locationObj
                            ? `Current position: latitude: ${this.state.currentLatitude}, longitude: ${this.state.currentLongitude}`
                            : ''}
                    </Text>
                    <Button
                        style={styles.button}
                        title={this.state.isRecording ? 'Stop' : 'Start'}
                        onPress={
                            this.state.isRecording
                                ? this.stopRecording
                                : this.startRecording
                        }
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {},
    maps: {},
    mapsContainer: {
        ...StyleSheet.absoluteFillObject,
        height: Math.round(Dimensions.get('window').height - 300),
        width: Math.round(Dimensions.get('window').width),
        justifyContent: 'flex-end',
        alignItems: 'center',
        elevation: -1,
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
        elevation: 3,
    },
});

export default RecordingScreen;
