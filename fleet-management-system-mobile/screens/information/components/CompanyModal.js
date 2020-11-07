import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Title from '../../../components/Title';
import RowData from './RowData';

const CompanyModal = ({ modalVisible, setModalVisible }) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    console.log('Modal has been closed.');
                    setModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Title border text={'Korporacjonex'} />
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
                            title={'Gotowe'}
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
                            onPress={() => {
                                setModalVisible(false);
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

export default CompanyModal;
