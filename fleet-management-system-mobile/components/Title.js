import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Title = ({ border, text }) => {
    return (
        <Text style={border ? [styles.title, styles.border] : styles.title}>
            {text}
        </Text>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    border: {
        borderBottomWidth: 1,
        paddingBottom: 20,
        borderBottomColor: 'black',
        marginBottom: 15,
    },
});

export default Title;
