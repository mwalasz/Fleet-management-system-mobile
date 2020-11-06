import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const TextCard = ({ title, content, big }) => (
    <View style={big ? styles.bigTextContainer : styles.textContainer}>
        <Text style={styles.title}>{title || 'Empty title'}</Text>
        <Text style={styles.content}>{content || 'Empty content'}</Text>
    </View>
);

const styles = StyleSheet.create({
    textContainer: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    bigTextContainer: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        padding: 10,
    },

    title: {
        fontSize: 17,
        paddingBottom: 5,
    },
    content: {
        fontStyle: 'italic',
    },
});

export default TextCard;
