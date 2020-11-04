import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    View,
    StatusBar,
} from 'react-native';
import { withTheme } from 'react-native-elements';
import { defaultVehicleImagePath } from '../../../utils/constans';

const setColor = (isSelected, theme) => {
    return isSelected ? theme.colors.gray : theme.colors.blue;
};

const VehiclesListItem = ({ item, onPress, isSelected, theme }) => (
    <TouchableOpacity
        onPress={onPress}
        style={{ ...styles.item, backgroundColor: setColor(isSelected, theme) }}
    >
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{
                    uri: defaultVehicleImagePath,
                }}
            />
            <View style={styles.textContainer}>
                <Text
                    style={styles.title}
                >{`${item.brand} ${item.model}`}</Text>
                <Text style={styles.licensePlate}>{item.licensePlate}</Text>
            </View>
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
    image: {
        width: 100,
        height: 100,
        borderRadius: 400,
        marginRight: 20,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    textContainer: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    title: {
        fontSize: 17,
        paddingBottom: 5,
    },
    licensePlate: {
        fontStyle: 'italic',
    },
});

export default withTheme(VehiclesListItem);
