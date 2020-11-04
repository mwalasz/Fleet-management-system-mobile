import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigator } from './navigation/StackNavigators';
import { ThemeProvider } from 'react-native-elements';
import { defaultTheme } from './utils/themes';

const App = () => {
    return (
        <NavigationContainer>
            <ThemeProvider theme={defaultTheme}>
                <MainStackNavigator />
            </ThemeProvider>
        </NavigationContainer>
    );
};

export default App;
