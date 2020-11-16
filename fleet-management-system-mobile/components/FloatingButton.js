import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Icon from '../components/Icon';

const FloatingButton = ({ theme, disabled, onClick }) => {
    const gray = theme.colors.gray;
    const red = theme.colors.red;
    const green = theme.colors.green;

    return (
        <View style={styles.container}>
            <Button
                buttonStyle={styles.button}
                containerStyle={styles.button}
                icon={<Icon name={disabled ? 'exclamation-triangle' : 'car'} />}
                disabled={disabled}
                onPress={onClick}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    button: {
        margin: 10,
        padding: 20,
        borderRadius: 40,
        height: 70,
        width: 70,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default withTheme(FloatingButton);
