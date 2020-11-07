import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { screenInfo } from '../../utils/constans';
import { usePermissions, LOCATION } from 'expo-permissions';

const SettingsScreen = ({ navigation }) => {
    const [permission, askForPermission] = usePermissions(LOCATION, {
        ask: true,
    });

    return (
        <View style={styles.container}>
            <Button
                iconRight
                buttonStyle={styles.button}
                title={'Wyloguj się'}
                titleStyle={{ marginRight: 10 }}
                icon={<Icon name="sign-out" size={15} color="white" />}
                onPress={() => {
                    navigation.navigate(screenInfo.login.name);
                }}
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
        // alignItems: 'center',
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

export default SettingsScreen;
