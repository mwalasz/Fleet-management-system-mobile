import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

const LoginFormInput = ({ mail, onChangeText, value, isError }) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    return (
        <View style={styles.container}>
            <Input
                value={value}
                onChangeText={onChangeText}
                containerStyle={mail ? { marginBottom: 40 } : {}}
                inputContainerStyle={isError ? { borderColor: 'red' } : {}}
                label={mail ? 'Mail' : 'Hasło'}
                labelStyle={styles.label}
                placeholder={mail ? 'mail@adres.pl' : 'hasło'}
                secureTextEntry={!mail && !isPasswordVisible}
                errorMessage={
                    isError && mail ? 'Podaj poprawny adres mailowy!' : ''
                }
                errorStyle={styles.error}
                leftIcon={
                    <Icon
                        name={mail ? 'user' : 'key'}
                        size={18}
                        color="gray"
                        style={styles.icon}
                    />
                }
                rightIcon={
                    !mail && (
                        <Icon
                            name={isPasswordVisible ? 'eye-slash' : 'eye'}
                            size={18}
                            color="gray"
                            onPress={() =>
                                setIsPasswordVisible(!isPasswordVisible)
                            }
                            style={styles.icon}
                        />
                    )
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        marginTop: 30,
    },
    icon: { marginRight: 10 },
    error: {
        paddingBottom: 30,
        fontWeight: 'bold',
    },
});

export default LoginFormInput;
