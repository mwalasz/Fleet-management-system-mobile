import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Modal } from 'react-native';
import { Button } from 'react-native-elements';
import Avatar from '../../components/Avatar';
import TextCard from '../../components/TextCard';
import { defaultUserPath } from '../../utils/constans';
import RowData from './components/RowData';
import Icon from 'react-native-vector-icons/FontAwesome';
import CompanyModal from './components/CompanyModal';
import Title from '../../components/Title';

const InformationScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.userInfoContainer}>
                <View style={styles.avatar}>
                    <Avatar source={defaultUserPath} />
                </View>
                <TextCard
                    big
                    title={'Anna Kowalska'}
                    content={'Nr prawa jazdy: erifunfqohudvn'}
                />
            </View>
            <View style={styles.statisticsContainer}>
                <Title border text={'Twoje statystyki'} />
                <View style={styles.data}>
                    <RowData info={'Ilość tras'} data={'4'} />
                    <RowData info={'Łączny dystans'} data={'1234 km'} />
                    <RowData info={'Średnia prędkość'} data={'85 km/h'} />
                </View>
            </View>
            <View style={styles.button}>
                <Button
                    title={'Firma'}
                    titleStyle={{ marginRight: 10 }}
                    iconRight
                    icon={<Icon name="info-circle" size={15} color="white" />}
                    containerStyle={{ alignSelf: 'stretch' }}
                    onPress={() => {
                        setModalVisible(true);
                    }}
                />
            </View>
            <CompanyModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        marginHorizontal: 20,
        marginVertical: 30,
    },
    avatar: {
        position: 'relative',
        left: 16,
        elevation: 1,
    },
    statisticsContainer: {
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 30,
    },
    data: {
        marginTop: 20,
    },
    button: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 20,
        width: 300,
        // right: 0,
    },
});

export default InformationScreen;
