import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { withTheme } from 'react-native-elements';

const setColor = (isSelected, theme) => {
    return isSelected ? theme.colors.secondary : theme.colors.primary;
};

const VehiclesListItem = ({ item, onPress, isSelected, theme }) => (
    <TouchableOpacity
        onPress={onPress}
        style={{ ...styles.item, backgroundColor: setColor(isSelected, theme) }}
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

export default withTheme(VehiclesListItem);
