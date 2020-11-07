import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { screenInfo } from '../../utils/constans';

const SettingsScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* <Text>Settings screen</Text> */}
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
