import * as React from 'react';
import {
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import LogoImage from '../../components/LogoImage';
import LoginFormInput from './components/LoginFormInput';
import { screenInfo } from '../../utils/constans';
import { Header } from '@react-navigation/stack';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = ({ navigation }) => {
    const [mail, onChangeMail] = React.useState('test@test.pl');
    const [password, onChangePassword] = React.useState('test');
    const [isButtonActive, changeButtonActiveness] = React.useState(true);

    const checkIfCanLogin = () => {
        changeButtonActiveness(!(mail.length == 0 || password.length == 0));
    };

    const isMailWrong = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !re.test(email);
    };

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={Header.HEIGHT + 50}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <LogoImage />
                    <LoginFormInput
                        mail
                        isError={isMailWrong(mail)}
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

                    <View style={styles.buttonContainer}>
                        <Button
                            containerStyle={styles.button}
                            title="Zaloguj się"
                            titleStyle={{ marginRight: 10 }}
                            iconRight
                            icon={
                                <Icon name="sign-in" size={15} color="white" />
                            }
                            disabled={!isButtonActive}
                            onPress={() =>
                                navigation.navigate(screenInfo.home.name)
                            }
                            loading={!isButtonActive}
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
        backgroundColor: '#fff',
    },
    buttonContainer: {
        backgroundColor: 'white',
        marginTop: 52,
    },
});

export default LoginScreen;
