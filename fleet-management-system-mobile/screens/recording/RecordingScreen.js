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
import {
    calcMaxSpeed,
    calcRouteDistance,
    calcAverageSpeed,
    calcRouteDuration,
} from '../../utils/calculations';
import {
    formatTimeData,
    formatDate,
    formatDistance,
    formatSpeed,
} from '../../utils/formating';

class RecordingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.DELTA = 0.005;
        this.locationObj = null;
        this.mapRef = null;
        this.region = null;
        this.timer = null;
        this.state = {
            currentLatitude: null,
            currentLongitude: null,
            currentSpeed: 0,
            locationHistory: [],
            error: '',
            isRecording: false,
            currentRegion: null,
            isModalVisible: false,
            startTime: null,
            endTime: null,
            distance: 0,
            maxSpeed: 0,
            averageSpeed: 0,
            duration: 0,
        };
    }

    getDataForModal = () => {
        return [
            {
                info: 'Rozpoczęcie',
                data: formatDate(this.state.startTime),
            },
            {
                info: 'Zakończenie',
                data: formatDate(this.state.endTime),
            },
            {
                info: 'Długość trwania',
                data: formatTimeData(this.state.duration),
            },
            {
                info: 'Całkowity dystans',
                data: formatDistance(this.state.distance),
            },
            {
                info: 'Maksymalna prędkość',
                data: formatSpeed(this.state.maxSpeed),
            },
            {
                info: 'Średnia prędkość',
                data: formatSpeed(this.state.averageSpeed),
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
            const startTime = new Date();
            this.setState({ startTime });

            this.locationObj = await Location.watchPositionAsync(
                {
                    accuracy: Location.LocationAccuracy.High,
                    distanceInterval: 5,
                    timeInterval: 1000,
                },
                (newLocation) => {
                    let { latitude, longitude, speed } = newLocation.coords;
                    let convertedSpeed = parseFloat(speed / 3.6).toFixed(1);

                    this.setState((prevState) => ({
                        currentLatitude: latitude,
                        currentLongitude: longitude,
                        currentSpeed: convertedSpeed,
                        locationHistory: [
                            ...prevState.locationHistory,
                            {
                                latitude,
                                longitude,
                            },
                        ],
                        maxSpeed: parseFloat(
                            prevState.maxSpeed < convertedSpeed
                                ? convertedSpeed
                                : prevState.maxSpeed
                        ).toFixed(1),
                    }));
                }
            );
        }

        this.setState({ error: 'No permission granted!' });
    };

    startTimer = () => {
        this.setState({ duration: 0 });
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.setState((prevState) => {
                return { duration: prevState.duration + 1 };
            });
        }, 1000);
    };

    stopTimer = () => {
        clearInterval(this.timer);
    };

    startRecording = async () => {
        await this.start();
        this.startTimer();
        this.setState({ isRecording: true });
    };

    calculateAndSaveRouteData = () => {
        const duration = this.state.duration;
        const distance = calcRouteDistance(this.state.locationHistory);
        const avgSpeed = calcAverageSpeed(distance, duration);

        this.setState({
            averageSpeed: avgSpeed,
            distance: distance,
            duration: duration,
        });
    };

    stopRecording = async () => {
        if (this.state.isRecording && this.locationObj !== null) {
            const endTime = new Date();
            this.stopTimer();
            this.locationObj.remove();
            this.calculateAndSaveRouteData();

            this.setState(
                {
                    isModalVisible: true,
                    isRecording: false,
                    endTime: endTime,
                },
                () => console.log(this.state)
            );
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

    resetData = () => {
        this.setState({
            currentLatitude: null,
            currentLongitude: null,
            currentSpeed: 0,
            locationHistory: [],
            error: '',
            startTime: null,
            endTime: null,
            distance: 0,
            maxSpeed: 0,
            averageSpeed: 0,
            duration: 0,
        });
    };

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
                        {this.state.isRecording
                            ? 'Trwa podróż...'
                            : 'Zacznij nagrywać podróż:'}
                    </Text>
                    <View style={styles.bottomModalDataAndButton}>
                        <View style={styles.dataSection}>
                            <RowData
                                noMargin
                                info={'Czas'}
                                data={formatTimeData(this.state.duration)}
                            />
                            <RowData
                                noMargin
                                info={'Prędkość'}
                                data={formatSpeed(this.state.currentSpeed)}
                            />
                            <RowData
                                noMargin
                                info={'Szer. geog.'}
                                data={
                                    this.state.isRecording
                                        ? this.state.currentLatitude || '0.0'
                                        : '0.0'
                                }
                            />
                            <RowData
                                noMargin
                                info={'Dł. geog.'}
                                data={
                                    this.state.isRecording
                                        ? this.state.currentLongitude || '0.0'
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
                    data={this.getDataForModal()}
                    title={'Podsumowanie'}
                    modalVisible={this.state.isModalVisible}
                    hideModal={() => {
                        this.setState({ isModalVisible: false });
                        this.resetData();
                    }}
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
