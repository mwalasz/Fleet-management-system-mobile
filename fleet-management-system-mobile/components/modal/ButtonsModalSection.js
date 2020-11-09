import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const ButtonModalSection = ({
    summary,
    acceptAction,
    hideModal: cancelAction,
}) => {
    if (summary) {
        return (
            <View style={styles.container}>
                <Button
                    title={'Zapisz dane'}
                    titleStyle={{ marginRight: 10 }}
                    iconRight
                    icon={<Icon name="check-circle" size={15} color="white" />}
                    containerStyle={styles.mutliButtons}
                    onPress={acceptAction}
                />
                <Button
                    title={'Anuluj'}
                    titleStyle={{ marginRight: 10 }}
                    iconRight
                    icon={<Icon name="times-circle" size={15} color="white" />}
                    containerStyle={styles.mutliButtons}
                    buttonStyle={{ backgroundColor: '#E80000' }}
                    onPress={cancelAction}
                />
            </View>
        );
    } else {
        return (
            <Button
                title={'Gotowe'}
                titleStyle={{ marginRight: 10 }}
                iconRight
                icon={<Icon name="check-circle" size={15} color="white" />}
                containerStyle={styles.singleButton}
                onPress={cancelAction}
            />
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignContent: 'center',
    },
    mutliButtons: {
        padding: 5,
    },
    singleButton: {
        alignSelf: 'stretch',
    },
});

export default ButtonModalSection;
