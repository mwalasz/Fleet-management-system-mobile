import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Avatar from '../../components/Avatar';
import TextCard from '../../components/TextCard';
import { defaultUserPath } from '../../utils/constans';
import RowData from '../../components/RowData';
import Icon from 'react-native-vector-icons/FontAwesome';
import Title from '../../components/Title';
import { Dimensions } from 'react-native';
import Modal from '../../components/Modal';

const InformationScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const userData = [
        {
            info: 'Ilość tras',
            data: '4',
        },
        {
            info: 'Łączny dystans',
            data: '1234 km',
        },
        {
            info: 'Średnia prędkość',
            data: '85 km/h',
        },
    ];

    const companyData = [
        {
            info: 'Adres',
            data: 'Gliwice, Akademicka 16',
        },
        {
            info: 'NIP',
            data: '123 456 78 90',
        },
        {
            info: 'Telefon',
            data: '987 654 321',
        },
        {
            info: 'Mail',
            data: 'korporacjonex@poczta.pl',
        },
    ];

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
                    {userData.map((x) => {
                        return <RowData info={x.info} data={x.data} />;
                    })}
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
            <Modal
                data={companyData}
                title={'Korporacjonex'}
                modalVisible={modalVisible}
                hideModal={() => setModalVisible(false)}
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
        width: Math.round(Dimensions.get('window').width) - 40,
        // right: 0,
    },
});

export default InformationScreen;
