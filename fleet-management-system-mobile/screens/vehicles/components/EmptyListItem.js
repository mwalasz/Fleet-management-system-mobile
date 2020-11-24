import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { withTheme } from 'react-native-elements';
import TextCard from '../../../components/TextCard';
import Avatar from '../../../components/Avatar';
import { sadCar } from '../../../utils/constans';

const EmptyListItem = () => (
    <TouchableOpacity style={{ ...styles.item }}>
        <View style={styles.container}>
            <View style={styles.avatar}>
                <Avatar source={sadCar} />
            </View>
            <TextCard
                title={'Brak dostępnych pojazdów!'}
                content={'Skontaktuj się z kierownikiem :('}
            />
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#FF4C4C',
    },
    avatar: {
        marginRight: 20,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
    },
});

export default withTheme(EmptyListItem);
