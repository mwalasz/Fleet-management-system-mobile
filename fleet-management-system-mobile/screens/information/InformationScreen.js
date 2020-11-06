import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Avatar from '../../components/Avatar';
import TextCard from '../../components/TextCard';
import { defaultUserPath } from '../../utils/constans';
import RowData from './components/RowData';

const InformationScreen = ({ navigation }) => {
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
                <Text style={styles.title}>Twoje Statystyki</Text>
                <View style={styles.data}>
                    <RowData info={'Ilość tras'} data={'4'} />
                    <RowData info={'Dystans'} data={'1234 km'} />
                    <RowData info={'Średnia prędkość'} data={'85 km/h'} />
                </View>
            </View>
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
        marginVertical: 40,
    },
    avatar: {
        position: 'relative',
        left: 16,
        elevation: 1,
    },
    title: {
        borderBottomWidth: 1,
        paddingBottom: 20,
        borderBottomColor: 'black',
        marginBottom: 20,
        fontWeight: 'bold',
        fontSize: 30,
    },
    statisticsContainer: {
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 30,
    },
    data: {
        marginTop: 20,
    },
});

export default InformationScreen;
