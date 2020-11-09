import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import backHandler from '../../handlers/backHandler';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Dimensions } from 'react-native';
import Modal from '../../components/modal/Modal';
import RowData from '../../components/RowData';

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

    data = () => {
        return [
            {
                info: 'Dystans',
                data: '40 km',
            },
            {
                info: 'Czas',
                data: '20 min',
            },
            {
                info: 'Prędkość',
                data: '90 km/h',
            },
            {
                info: 'Średnia prędkość',
                data: '80 km/h',
            },
        ];
    };

    validatePermissions = async () => {
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
                        onUserLocationChange={(event) => {
                            this.regionChanged(event);
                            this.userLocationChanged(event);
                        }}
                    />
                </View>
                <View style={styles.bottomModal}>
                    <Text style={styles.bottomModalTitle}>
                        {'Zacznij nagrywać podróż:'}
                    </Text>
                    <View style={styles.bottomModalDataAndButton}>
                        <View style={styles.dataSection}>
                            <RowData noMargin info={'Dystans'} data={'10km'} />
                            <RowData noMargin info={'Czas'} data={'10km'} />
                            <RowData
                                noMargin
                                info={'Prędkość'}
                                data={'30 km/h'}
                            />
                            <RowData
                                noMargin
                                info={'Średnia prędkość'}
                                data={'60 km/h'}
                            />
                            <RowData
                                noMargin
                                info={'Latitude'}
                                data={
                                    this.state.isRecording
                                        ? this.state.currentLatitude
                                        : '0.0'
                                }
                            />
                            <RowData
                                noMargin
                                info={'Longitude'}
                                data={
                                    this.state.isRecording
                                        ? this.state.currentLongitude
                                        : '0.0'
                                }
                            />
                        </View>
                        <View style={{ flex: 2, alignContent: 'center' }}>
                            <Button
                                titleStyle={{ marginRight: 10 }}
                                buttonStyle={{
                                    ...styles.button,
                                    backgroundColor: this.state.isRecording
                                        ? '#E80000'
                                        : '#A7F500',
                                }}
                                iconRight
                                icon={
                                    <Icon
                                        name={
                                            this.state.isRecording
                                                ? 'check-circle-o'
                                                : 'dot-circle-o'
                                        }
                                        size={15}
                                        color="white"
                                    />
                                }
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
                    summary
                    data={this.data()}
                    title={'Podsumowanie'}
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
    bottomModal: {
        backgroundColor: '#fff',
        elevation: 3,
        position: 'absolute',
        alignSelf: 'center',
        paddingLeft: 25,
        paddingBottom: 20,
        paddingTop: 10,
        top: Math.round(Dimensions.get('window').height) - 245,
        width: Math.round(Dimensions.get('window').width) - 50,
        height: 160,
        borderRadius: 40,
        textAlign: 'center',
        justifyContent: 'space-around',
        elevation: 3,
    },
    bottomModalTitle: {
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 15,
    },
    dataSection: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    bottomModalDataAndButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignContent: 'center',
    },
});

export default RecordingScreen;
