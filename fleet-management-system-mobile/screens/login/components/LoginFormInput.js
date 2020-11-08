import * as React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const LoginFormInput = ({ mail, onChangeText, value }) => {
    return (
        <View style={styles.container}>
            <TextInput
                placeholder={'Podaj ' + (mail ? 'mail' : 'hasło')}
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
                autoCompleteType={mail ? 'email' : 'password'}
                secureTextEntry={!mail}
            />
            <Text>{mail ? 'Mail' : 'Hasło'}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    input: {
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 2,
        paddingTop: 20,
        paddingHorizontal: 10,
        marginTop: 20,
    },
});

export default LoginFormInput;
