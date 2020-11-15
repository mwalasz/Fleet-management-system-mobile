import 'react-native-gesture-handler';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigator } from './navigation/Navigation';
import { ThemeProvider } from 'react-native-elements';
import { defaultTheme } from './utils/themes';

const store = configureStore();

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <ThemeProvider theme={defaultTheme}>
                    <MainStackNavigator />
                </ThemeProvider>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
