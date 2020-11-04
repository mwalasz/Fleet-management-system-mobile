import * as React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import LogoImage from '../../components/LogoImage';
import LoginFormInput from './components/LoginFormInput';
import { screenInfo } from '../../utils/constans';

const LoginScreen = ({ navigation }) => {
    const [mail, onChangeMail] = React.useState('test');
    const [password, onChangePassword] = React.useState('test');
    const [isButtonActive, changeButtonActiveness] = React.useState(true);

    const checkIfCanLogin = () => {
        changeButtonActiveness(mail.length > 0 && password.length > 0);
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.inputsContainer}>
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
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    styles={styles.button}
                    title="Zaloguj się"
                    disabled={!isButtonActive}
                    onPress={() => navigation.navigate(screenInfo.home.name)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    inputsContainer: {
        flex: 2,
        justifyContent: 'center',
        margin: 20,
        alignItems: 'center',
        alignItems: 'stretch',
        marginHorizontal: 40,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    button: {
        backgroundColor: '#fff',
    },
});

export default LoginScreen;
