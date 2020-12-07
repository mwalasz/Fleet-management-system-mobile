import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { withTheme } from 'react-native-elements';
import TextCard from '../../../components/TextCard';
import Avatar from '../../../components/Avatar';
import { DEFAULT_VEHICLE_IMAGE } from '../../../utils/constans';

const setColor = (isSelected, theme) => {
    return isSelected ? theme.colors.blue : theme.colors.gray;
};

const VehiclesListItem = ({ item, onPress, isSelected, theme }) => (
    <TouchableOpacity
        onPress={onPress}
        style={{ ...styles.item, backgroundColor: setColor(isSelected, theme) }}
    >
        <View style={styles.container}>
            <View style={styles.avatar}>
                <Avatar source={DEFAULT_VEHICLE_IMAGE} />
            </View>
            <TextCard
                title={`${item.brand} ${item.model}`}
                content={item.licensePlate}
            />
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 20,
    },
    avatar: {
        marginRight: 20,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
    },
});

export default withTheme(VehiclesListItem);
