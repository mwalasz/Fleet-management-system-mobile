import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import Icon from '../../components/Icon';
import { screenInfo } from '../../utils/constans';
import { usePermissions, LOCATION } from 'expo-permissions';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/authorization_actions';

const SettingsScreen = ({
    navigation,
    dispatch,
    isAuthenticated,
    isLoggingOut,
}) => {
    const [permission, askForPermission] = usePermissions(LOCATION, {
        ask: true,
    });

    const handleSubmit = () => {
        dispatch(logoutUser());
        navigation.navigate(screenInfo.login.name);
    };

    return (
        <View style={styles.container}>
            <Button
                iconRight
                buttonStyle={styles.button}
                title={'Wyloguj się'}
                titleStyle={{ marginRight: 10 }}
                icon={<Icon name="sign-out" />}
                onPress={handleSubmit}
            />
            {/* <CheckBox
                center
                title="Click Here to Remove This Item"
                iconRight
                iconType="material"
                checkedIcon="clear"
                uncheckedIcon="add"
                checkedColor="red"
                checked={() => (checked = checked ? false : true)}
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        margin: 10,
    },
    button: {
        backgroundColor: 'red',
        paddingHorizontal: 10,
        alignSelf: 'stretch',
        margin: 10,
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
