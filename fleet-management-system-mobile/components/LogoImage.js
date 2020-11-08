import * as React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const LogoImage = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../assets/logo.png')}
            />
        </View>
    );
};

const size = 250;
const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'center',
    },
    image: {
        alignSelf: 'center',
        height: size,
        width: size,
    },
});

export default LogoImage;
