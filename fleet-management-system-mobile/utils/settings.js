import AsyncStorage from '@react-native-async-storage/async-storage';

const storeApiUrl = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('api_url', jsonValue);
    } catch (e) {
        console.log(`Error while accessing ascync storage.`);
    }
};

const getApiUrl = async () => {
    try {
        const value = await AsyncStorage.getItem('api_url');
        if (value !== null) {
            return value;
        }
    } catch (e) {
        console.log(`Error while accessing ascync storage.`);
    }
};
