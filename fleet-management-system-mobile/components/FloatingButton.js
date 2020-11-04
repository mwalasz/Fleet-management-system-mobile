import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { withTheme } from 'react-native-elements';

const FloatingButton = ({ theme, disabled, onClick }) => {
    const gray = theme.colors.gray;
    const green = theme.colors.green;

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{
                    ...styles.button,
                    backgroundColor: disabled ? gray : green,
                }}
                disabled={disabled}
                onPress={onClick}
            >
                <Image
                    source={require('../assets/start.png')}
                    style={styles.image}
                />
            </TouchableOpacity>
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
        borderRadius: 400,
        height: 70,
        width: 70,
        alignContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 35,
        width: 35,
    },
});

export default withTheme(FloatingButton);
