import React from 'react';
import VehiclesListItem from './VehiclesListItem';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    StatusBar,
    Text,
    View,
} from 'react-native';

const DATA = [
    {
        id: 'vw_polo_1',
        brand: 'Volkswagen',
        model: 'Polo',
        licensePlate: 'SK1234A',
    },
    {
        id: 'vw_passat_1',
        brand: 'Volkswagen',
        model: 'Passat',
        licensePlate: 'SK4321Z',
    },
    {
        id: 'skoda_superb_1',
        brand: 'Skoda',
        model: 'Superb',
        licensePlate: 'SZ00000',
    },
    {
        id: 'vw_polo_2',
        brand: 'Volkswagen',
        model: 'Polo',
        licensePlate: 'SK1234A',
    },
    {
        id: 'vw_passat_2',
        brand: 'Volkswagen',
        model: 'Passat',
        licensePlate: 'SK4321Z',
    },
    {
        id: 'skoda_superb_2',
        brand: 'Skoda',
        model: 'Superb',
        licensePlate: 'SZ00000',
    },
];

const VehiclesList = ({ selectedId, setSelectedId }) => {
    const renderItem = ({ item }) => {
        return (
            <VehiclesListItem
                item={item}
                onPress={() => setSelectedId(item.id)}
                isSelected={item.id === selectedId}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.text}>
                <Text>
                    {'Wybierz jeden z dostępnych pojazdów, aby zacząć podróż:'}
                </Text>
            </View>
            <FlatList
                style={styles.list}
                data={DATA}
                renderItem={(item) =>
                    renderItem(item, selectedId, setSelectedId)
                }
                keyExtractor={(item) => item.id}
                extraData={selectedId}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        backgroundColor: '#fff',
        padding: 15,
        marginTop: 10,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {},
});

export default VehiclesList;
