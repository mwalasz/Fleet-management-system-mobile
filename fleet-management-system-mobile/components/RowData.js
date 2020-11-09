import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const RowData = ({ info, data, noMargin }) => (
    <View style={styles.container}>
        <Text style={noMargin ? null : styles.text}>
            {info ? `${info}:` : ''}
        </Text>
        <Text style={noMargin ? null : styles.text}>{data ?? ''}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        marginBottom: 10,
    },
});

export default RowData;
