import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const RowData = ({ info, data }) => (
    <View style={styles.container}>
        <Text style={styles.text}>{`${info}:`}</Text>
        <Text style={styles.text}>{data}</Text>
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
