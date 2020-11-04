import React from 'react';
import VehiclesListItem from './VehiclesListItem';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
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
            <FlatList
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
        // marginTop: StatusBar.currentHeight || 0,
    },
});

export default VehiclesList;
