import React, { useEffect, useState } from 'react';
import { Alert, Text, View, StyleSheet } from 'react-native';
import backHandler from '../../handlers/backHandler';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

class RecordingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locationObj: null,
            currentLatitude: null,
            currentLongitude: '',
            locationHistory: [],
            error: '',
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
            const loc = await Location.watchPositionAsync(
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
                },
                (error) => console.log(error)
            );

            this.setState({ location: loc });
        }

        this.setState({ error: 'No permission granted!' });
    };

    startRecording = async () => {
        await this.start();
    };

    stopRecording = async () => {
        if (this.state.locationObj) await this.state.locationObj.remove();
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
                        <Text style={styles.title}>Current position: </Text>
                        {this.state.locationObj
                            ? `latitude: ${this.state.currentLatitude}, longitude: ${this.state.currentLongitude}`
                            : ''}
                    </Text>
                    <Button title={'Start'} onPress={this.startRecording} />
                    <Button
                        title={'Stop'}
                        onPress={() => this.stopRecording()}
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
