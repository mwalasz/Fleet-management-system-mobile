import { BackHandler, Alert } from 'react-native';

const backHandler = ({ goBack }) => {
    const backAction = () => {
        console.log(goBack);
        Alert.alert(
            'Uwaga!',
            'Czy na pewno chcesz wyjść w trakcie nagrywania jazdy?',
            [
                {
                    text: 'Anuluj',
                    onPress: () => null,
                    style: 'cancel',
                },
                {
                    text: 'TAK',
                    onPress: () => goBack(),
                },
            ]
        );
        return true;
    };

    const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
    );

    return () => backHandler.remove();
};

export default backHandler;
