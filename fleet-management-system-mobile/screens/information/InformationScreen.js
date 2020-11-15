import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Avatar from '../../components/Avatar';
import TextCard from '../../components/TextCard';
import { defaultUserPath } from '../../utils/constans';
import RowData from '../../components/RowData';
import Icon from 'react-native-vector-icons/FontAwesome';
import Title from '../../components/Title';
import { Dimensions } from 'react-native';
import Modal from '../../components/modal/Modal';
import { connect } from 'react-redux';
import { getDriverStatistics } from '../../utils/endpoints';
import { userStatisticsData } from '../../utils/createDataForModal';

const InformationScreen = ({ navigation, user }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [userApiData, setUserApiData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

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

    useEffect(() => {
        console.log('use effect fired');
        setIsLoading(true);
        getDriverStatistics(user, setUserApiData);
    }, []);

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
                    {userStatisticsData(userApiData).map((x) => {
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
                        console.log(userApiData);
                    }}
                    isLoading={isLoading}
                    // onPress={() => {
                    //     setModalVisible(true);
                    // }}
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

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(InformationScreen);
