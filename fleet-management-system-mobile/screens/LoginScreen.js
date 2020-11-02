import * as React from "react";
import { View, Text, Button, TextInput } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [value, onChangeText] = React.useState('Useless Placeholder');

  return (
      <View>
        <TextInput
            style={{ height: 40, width: 100, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => onChangeText(text)}
            value={value}
        />
        <Button
            title="Home"
            onPress={() =>
                navigation.navigate('Home')
            }
            // onPress={() =>
            //     navigation.navigate('HomeScreen', { name: 'Jane' })
            // }
        />
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

export default LoginScreen;