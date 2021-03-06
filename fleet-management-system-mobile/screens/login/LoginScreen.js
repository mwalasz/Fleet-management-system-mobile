import * as React from 'react';
import {
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Text,
} from 'react-native';
import LogoImage from '../../components/LogoImage';
import LoginFormInput from './components/LoginFormInput';
import { Header } from '@react-navigation/stack';
import { Button } from 'react-native-elements';
import Icon from '../../components/Icon';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/authorization_actions';

const LoginScreen = ({
    navigation,
    isLoggingIn,
    isAuthenticated,
    dispatch,
    loginError,
    wrongRole,
    userName,
}) => {
    const [mail, onChangeMail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [isButtonActive, changeButtonActiveness] = React.useState(true);

    const checkIfCanLogin = () => {
        changeButtonActiveness(!(mail.length == 0 || password.length == 0));
    };

    const isMailWrong = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !re.test(email);
    };

    const handleSubmit = () => {
        dispatch(loginUser(mail, password, navigation));
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
                        isError={mail.length >= 1 && isMailWrong(mail)}
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
                        {loginError &&
                            (wrongRole ? (
                                <Text style={styles.errorText}>
                                    Nie masz odpowiednich uprawnień!
                                </Text>
                            ) : (
                                <Text style={styles.errorText}>
                                    Błąd w trakcie logowania, spróbuj ponownie..
                                </Text>
                            ))}
                        <Button
                            containerStyle={styles.button}
                            title={
                                isAuthenticated
                                    ? `Witaj ${userName}`
                                    : 'Zaloguj się'
                            }
                            titleStyle={{ marginRight: 10 }}
                            iconRight
                            icon={
                                <Icon
                                    name={
                                        isAuthenticated
                                            ? 'check-circle'
                                            : 'sign-in'
                                    }
                                />
                            }
                            disabled={!isButtonActive}
                            onPress={handleSubmit}
                            loading={isLoggingIn}
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
    errorText: {
        marginBottom: 10,
        alignSelf: 'center',
        fontWeight: '600',
        color: 'red',
    },
});

const mapStateToProps = (state) => {
    return {
        isLoggingIn: state.auth.isLoggingIn,
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated,
        wrongRole: state.auth.wrongRole,
        userName: state.auth.user.firstName,
    };
};
export default connect(mapStateToProps)(LoginScreen);
