import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Title = ({ border, text }) => {
    return (
        <Text style={border ? styles.titleWithBorder : styles.title}>
            {text}
        </Text>
    );
};

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    titleWithBorder: {
        borderBottomWidth: 1,
        paddingBottom: 20,
        borderBottomColor: 'black',
        marginBottom: 15,
        fontWeight: 'bold',
        fontSize: 30,
    },
});

export default Title;
