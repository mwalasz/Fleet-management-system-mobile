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
        this.DELTA = 0.005;
        this.locationObj = null;
        this.mapRef = null;
        this.region = null;
        this.state = {
            currentLatitude: null,
            currentLongitude: '',
            locationHistory: [],
            error: '',
            isRecording: false,
            currentRegion: null,
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
                    timeInterval: 1000,
                },
                (newLocation) => {
                    // console.log('newLocation');
                    // console.log(newLocation);
                    let { latitude, longitude } = newLocation.coords;

                    this.setState({
                        currentLatitude: latitude,
                        currentLongitude: longitude,
                    });
                    this.setState((prevState) => ({
                        locationHistory: [
                            ...prevState.locationHistory,
                            {
                                currentLatitude: latitude,
                                currentLongitude: longitude,
                            },
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

    /////////////////////////////////////////////////////////////////////

    userLocationChanged(event) {
        const newRegion = event.nativeEvent.coordinate;

        this.region = {
            ...this.region,
            latitude: newRegion.latitude,
            longitude: newRegion.longitude,
        };

        this.animateToRegion();
    }

    animateToRegion() {
        if (this.mapRef) {
            this.mapRef.animateToRegion(
                {
                    latitude: this.region.latitude,
                    longitude: this.region.longitude,
                    latitudeDelta: this.region.latitudeDelta,
                    longitudeDelta: this.region.longitudeDelta,
                },
                800
            );
        }
    }

    regionChanged(event) {
        this.region = {
            longitudeDelta: this.DELTA,
            latitudeDelta: this.DELTA,
            latitude: event.latitude,
            longitude: event.longitude,
        };
    }

    render() {
        return (
            <View styles={styles.container}>
                <View>
                    <MapView
                        ref={(map) => {
                            this.mapRef = map;
                        }}
                        style={styles.maps}
                        followsUserLocation={true}
                        loadingEnabled={true}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        provider={PROVIDER_GOOGLE}
                        // onRegionChange={(event) => this.regionChanged(event)}
                        onUserLocationChange={(event) => {
                            this.regionChanged(event);
                            this.userLocationChanged(event);
                        }}
                    />
                </View>
                <View style={styles.locationTextContainer}>
                    <Text style={styles.locationText}>
                        {this.state.isRecording
                            ? `Current position: \nlatitude: ${this.state.currentLatitude}, longitude: ${this.state.currentLongitude}`
                            : 'Zacznij nagrywać podróż:'}
                    </Text>
                    <Button
                        buttonStyle={styles.button}
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
    button: { width: 200, alignSelf: 'center' },
    maps: {
        ...StyleSheet.absoluteFillObject,
        height: Math.round(Dimensions.get('window').height),
        width: Math.round(Dimensions.get('window').width),
        elevation: -100,
    },
    locationTextContainer: {
        backgroundColor: '#fff',
        elevation: 3,
        position: 'absolute',
        alignSelf: 'center',
        top: Math.round(Dimensions.get('window').height) - 270,
        width: Math.round(Dimensions.get('window').width) - 50,
        height: 100,
        borderRadius: 40,
        alignContent: 'center',
        textAlign: 'center',
        justifyContent: 'space-around',
        elevation: 3,
    },
    locationText: {
        fontWeight: 'bold',
        alignSelf: 'center',
    },
});

export default RecordingScreen;
