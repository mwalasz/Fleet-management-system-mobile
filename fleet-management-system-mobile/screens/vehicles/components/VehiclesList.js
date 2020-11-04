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
        const isItMe = item.id === selectedId;

        return (
            <VehiclesListItem
                item={item}
                onPress={() => setSelectedId(isItMe ? null : item.id)}
                isSelected={isItMe}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
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
    container: {},
    list: {},
});

export default VehiclesList;
