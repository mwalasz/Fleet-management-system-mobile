import React, { useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import VehiclesList from './components/VehiclesList';

const VehiclesScreen = () => {
    const [selectedId, setSelectedId] = useState(null);

    return (
        <VehiclesList selectedId={selectedId} setSelectedId={setSelectedId} />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    title: {
        fontSize: 32,
    },
});

export default VehiclesScreen;
