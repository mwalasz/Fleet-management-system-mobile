import React, { useEffect, useState } from 'react';
import { Alert, Text, View, StyleSheet } from 'react-native';
import backHandler from '../../handlers/backHandler';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Dimensions } from 'react-native';
import Modal from '../../components/Modal';

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
            isModalVisible: false,
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
            this.setState({ isModalVisible: true });
        }

        this.setState({ error: 'Error while ending location tracking!' });
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
                        {'Zacznij nagrywać podróż:'}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            alignContent: 'center',
                        }}
                    >
                        <View
                            style={{
                                flex: 3,
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            <Text>Dystans: 10km</Text>
                            <Text>Czas: 20min</Text>
                            <Text>Prędkość: 30km/h</Text>
                            <Text>{`latitude: ${
                                this.state.isRecording
                                    ? this.state.currentLatitude
                                    : ''
                            }`}</Text>
                            <Text>{`longitude: ${
                                this.state.isRecording
                                    ? this.state.currentLongitude
                                    : ''
                            }`}</Text>
                        </View>
                        <View style={{ flex: 2, alignContent: 'center' }}>
                            <Button
                                buttonStyle={styles.button}
                                title={
                                    this.state.isRecording ? 'Stop' : 'Start'
                                }
                                onPress={
                                    this.state.isRecording
                                        ? this.stopRecording
                                        : this.startRecording
                                }
                            />
                        </View>
                    </View>
                </View>
                <Modal
                    modalVisible={this.state.isModalVisible}
                    hideModal={() => this.setState({ isModalVisible: false })}
                />
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
    button: { width: 100, alignSelf: 'center' },
    maps: {
        ...StyleSheet.absoluteFillObject,
        height: Math.round(Dimensions.get('window').height) - 250,
        width: Math.round(Dimensions.get('window').width),
        elevation: -100,
    },
    locationTextContainer: {
        backgroundColor: '#fff',
        elevation: 3,
        position: 'absolute',
        alignSelf: 'center',
        paddingLeft: 25,
        paddingBottom: 20,
        paddingTop: 10,
        top: Math.round(Dimensions.get('window').height) - 235,
        width: Math.round(Dimensions.get('window').width) - 50,
        height: 150,
        borderRadius: 40,
        textAlign: 'center',
        justifyContent: 'space-around',
        elevation: 3,
    },
    locationText: {
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 10,
    },
});

export default RecordingScreen;
