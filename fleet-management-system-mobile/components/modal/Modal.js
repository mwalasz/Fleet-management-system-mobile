import React from 'react';
import { Modal as ModalNative, StyleSheet, View } from 'react-native';
import Title from '../Title';
import RowData from '../RowData';
import ButtonsSection from './ButtonsModalSection';

const Modal = ({
    modalVisible,
    acceptAction,
    hideModal,
    title,
    data,
    summary,
    acceptActionIsLoading,
}) => {
    const renderRowsData = () => {
        if (!data) {
            return <RowData />;
        }

        return data.map((x) => {
            return <RowData info={x.info} data={x.data} />;
        });
    };

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
                        <View style={styles.data}>{renderRowsData()}</View>
                        <ButtonsSection
                            summary={summary}
                            hideModal={hideModal}
                            acceptAction={acceptAction}
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
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 50,
        paddingVertical: 40,
        alignItems: 'stretch',
        shadowColor: '#000',
        shadowOffset: {
            width: 10,
            height: 20,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    button: {
        alignSelf: 'stretch',
    },
});

export default Modal;
