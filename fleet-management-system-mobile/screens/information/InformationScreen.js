import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Avatar from '../../components/Avatar';
import TextCard from '../../components/TextCard';
import { defaultUserPath } from '../../utils/constans';

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
                <Text>Information screen</Text>
                <Text>Ilość tras: </Text>
                <Text>Dystans:</Text>
                <Text>Średnia prędkość:</Text>
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
    image: {
        width: 100,
        height: 100,
        borderRadius: 400,
        marginRight: 20,
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        margin: 20,
    },
    avatar: {
        position: 'relative',
        left: 16,
        elevation: 1,
    },
    statisticsContainer: {},
});

export default InformationScreen;
