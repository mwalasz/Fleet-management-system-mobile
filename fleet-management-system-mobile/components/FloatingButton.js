import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { withTheme } from 'react-native-elements';
import { Button, Tooltip } from 'react-native-elements';
import Icon from '../components/Icon';

const FloatingButton = ({ disabled, onClick }) => {
    return (
        <View style={styles.container}>
            <Tooltip
                width={180}
                height={60}
                backgroundColor="#2196F3"
                popover={
                    <View style={styles.tooltip}>
                        <Text style={styles.tooltipText}>
                            Brak wymaganych uprawnień!
                        </Text>
                    </View>
                }
            >
                <Button
                    buttonStyle={styles.button}
                    containerStyle={styles.button}
                    icon={
                        <Icon
                            name={disabled ? 'exclamation-triangle' : 'car'}
                        />
                    }
                    disabled={disabled}
                    onPress={onClick}
                />
            </Tooltip>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    button: {
        margin: 10,
        padding: 20,
        borderRadius: 40,
        height: 70,
        width: 70,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'red',
    },
    tooltip: {
        padding: 20,
    },
    tooltipText: {
        color: '#fff',
        fontWeight: '700',
    },
});

export default withTheme(FloatingButton);
