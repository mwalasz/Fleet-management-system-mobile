import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Avatar = ({ source }) => (
    <Image
        style={styles.image}
        source={{
            uri: source,
        }}
    />
);

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 400,
        backgroundColor: 'white',
    },
});

export default Avatar;
