import * as React from 'react';
import {
    View,
    KeyboardAvoidingView,
    TextInput,
    StyleSheet,
    Text,
    Platform,
    TouchableWithoutFeedback,
    Button,
    Keyboard,
} from 'react-native';
import LogoImage from '../../components/LogoImage';
import LoginFormInput from './components/LoginFormInput';
import { screenInfo } from '../../utils/constans';
import { Header } from '@react-navigation/stack';

const LoginScreen = ({ navigation }) => {
    const [mail, onChangeMail] = React.useState('test');
    const [password, onChangePassword] = React.useState('test');
    const [isButtonActive, changeButtonActiveness] = React.useState(true);

    const checkIfCanLogin = () => {
        changeButtonActiveness(mail.length > 0 && password.length > 0);
    };

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={Header.HEIGHT + 20}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <LogoImage />
                    <LoginFormInput
                        mail
                        value={mail}
                        onChangeText={(text) => {
                            onChangeMail(text);
                            checkIfCanLogin();
                        }}
                    />
                    <LoginFormInput
                        value={password}
                        onChangeText={(text) => {
                            onChangePassword(text);
                            checkIfCanLogin();
                        }}
                    />
                    <View style={styles.btnContainer}>
                        <Button
                            styles={styles.button}
                            title="Zaloguj się"
                            disabled={!isButtonActive}
                            onPress={() =>
                                navigation.navigate(screenInfo.home.name)
                            }
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        padding: 40,
        flex: 1,
        justifyContent: 'space-around',
    },
    header: {
        fontSize: 36,
        marginBottom: 48,
    },
    textInput: {
        height: 40,
        borderColor: '#000000',
        borderBottomWidth: 1,
        marginBottom: 36,
    },
    btnContainer: {
        backgroundColor: 'white',
        marginTop: 42,
    },
});

export default LoginScreen;
