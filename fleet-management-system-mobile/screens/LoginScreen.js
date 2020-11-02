import * as React from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [mail, onChangeMail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  return (
      <View style={styles.container}>
        <View style={{flex: 3, justifyContent: "center", margin: 20, alignItems: "center", alignItems: "stretch"}}>
            <TextInput
                style={styles.input}
                onChangeText={text => onChangeMail(text)}
                value={mail}
                autoCompleteType="email"
                />
            <Text>Mail</Text>
            <TextInput
                style={styles.input}
                onChangeText={ text => onChangePassword(text) }
                secureTextEntry
                value={password}
                autoCompleteType="password"
                />
            <Text>Password</Text>
        </View>            
        <View style={{ justifyContent: "flex-end"}}>
            <Button
                styles={styles.button}
                title="Zaloguj się"
                onPress={() =>
                    navigation.navigate('Home')
                }
            />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: "column",
  },
  input: {
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
    paddingTop: 20,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  button: {
    height: 100,
    backgroundColor: "#fff"
  }
});

export default LoginScreen;