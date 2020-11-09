import React from 'react';
import { Modal as ModalNative, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Title from './Title';
import RowData from './RowData';

const Modal = ({ modalVisible, hideModal, title, data }) => {
    return (
        <View style={styles.centeredView}>
            <ModalNative
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={hideModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Title border text={title} />
                        <View style={styles.data}>
                            <RowData
                                info={'Adres'}
                                data={'Gliwice, Akademicka 16'}
                            />
                            <RowData info={'NIP'} data={'123456789'} />
                            <RowData
                                info={'Mail'}
                                data={'korporacjonex@pam.pl'}
                            />
                            <RowData info={'Telefon'} data={'987-654-321'} />
                        </View>
                        <Button
                            title={'Zapisz dane'}
                            titleStyle={{ marginRight: 10 }}
                            iconRight
                            icon={
                                <Icon
                                    name="check-circle"
                                    size={15}
                                    color="white"
                                />
                            }
                            containerStyle={{ alignSelf: 'stretch' }}
                            onPress={hideModal}
                        />
                    </View>
                </View>
            </ModalNative>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
    data: {
        marginVertical: 20,
    },
    modalView: {
        margin: 30,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 50,
        paddingVertical: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 10,
            height: 20,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default Modal;
