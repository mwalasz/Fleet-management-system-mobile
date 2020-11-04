import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import VehiclesList from './components/VehiclesList';
import FloatingButton from '../../components/FloatingButton';
import { screenInfo } from '../../utils/constans';

const VehiclesScreen = ({ navigation }) => {
    const [selectedId, setSelectedId] = useState(null);

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.text}>
                    <Text>
                        {
                            'Wybierz jeden z dostępnych pojazdów, aby zacząć podróż:'
                        }
                    </Text>
                </View>
                <VehiclesList
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                />
            </View>
            <FloatingButton
                disabled={selectedId === null}
                onClick={() =>
                    navigation.navigate(screenInfo.recording.name, {
                        id: selectedId,
                    })
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: StatusBar.currentHeight || 0,
    },
    text: {
        backgroundColor: '#fff',
        padding: 15,
        marginTop: 10,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
    },
    button: {
        flex: 1,
        position: 'absolute',
        margin: 10,
        alignSelf: 'flex-end',
        flexDirection: 'column-reverse',
    },
});

export default VehiclesScreen;
