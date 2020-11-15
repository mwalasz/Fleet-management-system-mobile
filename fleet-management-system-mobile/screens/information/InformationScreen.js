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
import {
    getDriverStatistics,
    getDriverCompanyInfo,
} from '../../utils/endpoints';
import {
    userStatisticsData,
    userCompanyInformations,
} from '../../utils/createDataForModal';

const InformationScreen = ({ navigation, user }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [driverStatistics, setDriverStatistics] = useState({});
    const [companyInfo, setCompanyInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getDriverStatistics(user, setDriverStatistics);
        getDriverCompanyInfo(user, setCompanyInfo);
        setIsLoading(false);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.userInfoContainer}>
                <View style={styles.avatar}>
                    <Avatar source={defaultUserPath} />
                </View>
                <TextCard
                    big
                    title={`${user.firstName || 'Imię'} ${
                        user.lastName || 'Nazwisko'
                    }`}
                    content={`Nr prawa jazdy: ${
                        driverStatistics.licenseNumber || 'brak'
                    }`}
                />
            </View>
            <View style={styles.statisticsContainer}>
                <Title border text={'Twoje statystyki'} />
                <View style={styles.data}>
                    {userStatisticsData(driverStatistics).map((x) => {
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
                    // onPress={() => {
                    //     console.log(driverStatistics);
                    //     console.log(companyInfo);
                    // }}
                    loading={isLoading}
                    onPress={() => {
                        setModalVisible(true);
                    }}
                />
            </View>
            <Modal
                data={userCompanyInformations(companyInfo)}
                title={companyInfo.companyName ?? 'Nazwa firmy'}
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
    },
});

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(InformationScreen);
