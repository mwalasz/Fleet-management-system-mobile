import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import VehiclesList from './components/VehiclesList';
import FloatingButton from '../../components/FloatingButton';
import { screenInfo } from '../../utils/constans';
import { connect } from 'react-redux';
import { getDriverVehicles } from '../../utils/endpoints';

const VehiclesScreen = ({ navigation, user, permissionsGranted }) => {
    const [selectedKey, setSelectedKey] = useState(null);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        getDriverVehicles(user, setVehicles);
        console.log('uprawnienia:');
        console.log(permissionsGranted);
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.text}>
                    <Text>
                        {
                            'Wybierz jeden z dostępnych pojazdów, aby zacząć podróż:'
                        }
                    </Text>
                </View>
                <VehiclesList
                    vehicles={vehicles}
                    selectedKey={selectedKey}
                    setSelectedKey={setSelectedKey}
                />
            </View>
            <FloatingButton
                disabled={!permissionsGranted || selectedKey === null}
                onClick={() =>
                    navigation.navigate(screenInfo.recording.name, {
                        vin: selectedKey,
                    })
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: StatusBar.currentHeight || 0,
    },
    text: {
        backgroundColor: '#fff',
        padding: 15,
        marginTop: 10,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
    },
    button: {
        flex: 1,
        position: 'absolute',
        margin: 10,
        alignSelf: 'flex-end',
        flexDirection: 'column-reverse',
    },
});

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        permissionsGranted: state.permission.isGranted,
    };
};
export default connect(mapStateToProps)(VehiclesScreen);
