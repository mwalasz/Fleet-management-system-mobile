import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const setColor = (isSelected) => {
    return isSelected ? '#6e3b6e' : '#f9c2ff';
};

const VehiclesListItem = ({ item, onPress, isSelected }) => (
    <TouchableOpacity
        onPress={onPress}
        style={{ ...styles.item, backgroundColor: setColor(isSelected) }}
    >
        <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
});

export default VehiclesListItem;
