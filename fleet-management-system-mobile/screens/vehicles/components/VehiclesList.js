import React from 'react';
import VehiclesListItem from './VehiclesListItem';
import EmptyListItem from './EmptyListItem';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

const VehiclesList = ({ selectedKey, setSelectedKey, vehicles }) => {
    const renderItem = ({ item }) => {
        const isItMe = item.key === selectedKey;

        return (
            <VehiclesListItem
                item={item}
                onPress={() => setSelectedKey(isItMe ? null : item.key)}
                isSelected={isItMe}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={styles.list}
                data={vehicles}
                renderItem={(item) =>
                    renderItem(item, selectedKey, setSelectedKey)
                }
                keyExtractor={(item, index) => index.toString()}
                extraData={selectedKey}
                ListEmptyComponent={vehicles.length == 0 && <EmptyListItem />}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {},
    list: {},
});

export default VehiclesList;
