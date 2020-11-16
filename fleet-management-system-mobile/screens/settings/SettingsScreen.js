import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import Icon from '../../components/Icon';
import { screenInfo } from '../../utils/constans';
import { usePermissions, LOCATION, getAsync, askAsync } from 'expo-permissions';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/authorization_actions';
import { expo } from '../../app.json';
const SettingsScreen = ({
    navigation,
    dispatch,
    isAuthenticated,
    isLoggingOut,
}) => {
    const [granted, setIsGranted] = useState(false);
    const [denied, setIsDenied] = useState(false);
    const [packageVersion, setPackageVersion] = useState('');
    const handleSubmit = () => {
        dispatch(logoutUser());
        navigation.navigate(screenInfo.login.name);
    };

    const checkLocationPermissions = async () => {
        console.log('checkPermissions:');
        const { status, canAskAgain, granted } = await getAsync(LOCATION);
        console.log(granted);
        setIsGranted(granted);
    };

    const askForLocationPermissions = async () => {
        console.log('askForPermissions:');
        const { status } = await askAsync(LOCATION);
        console.log(status);

        if (status === 'granted') {
            setIsGranted(status === 'granted' ? true : false);
        } else if (status === 'denied') {
            setIsDenied(true);
        }
    };

    const noGpsGrantedText = `${
        denied ? '[Odmówiono dostępu] ' : '[Przydziel dostęp] '
    }Brak GPS`;

    useEffect(() => {
        checkLocationPermissions();
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.section}>
                    <Text>Kliknij, aby się wylogować:</Text>
                    <Button
                        iconRight
                        buttonStyle={styles.button}
                        title={'Wyloguj się'}
                        titleStyle={{ marginRight: 10 }}
                        icon={<Icon name="sign-out" />}
                        onPress={handleSubmit}
                    />
                </View>
                <View style={styles.section}>
                    <Text>Status wymaganych uprawnień:</Text>
                    <CheckBox
                        center
                        containerStyle={styles.checkBox}
                        title={granted ? 'Przyznano GPS' : noGpsGrantedText}
                        iconRight
                        iconType="material"
                        checkedIcon="done"
                        uncheckedIcon="error"
                        checkedColor="green"
                        uncheckedColor="white"
                        textStyle={{ color: 'white' }}
                        checked={granted}
                        onPress={() => {
                            if (!granted) {
                                console.log('tera bd chcial pozwolenie');
                                askForLocationPermissions();
                            }
                        }}
                    />
                </View>
                <View style={styles.section}>
                    <Text>{`Wersja aplikacji: ${expo.version}`}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        margin: 10,
    },
    section: {
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'red',
        paddingHorizontal: 10,
        alignSelf: 'stretch',
        margin: 10,
    },
    checkBox: {
        backgroundColor: '#2196F3',
    },
});

const mapStateToProps = (state) => {
    return {
        user: state.authorizationReducer.user,
        isAuthenticated: state.authorizationReducer.isAuthenticated,
        isLoggingOut: state.authorizationReducer.isLoggingOut,
    };
};
export default connect(mapStateToProps)(SettingsScreen);
