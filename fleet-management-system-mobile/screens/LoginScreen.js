import * as React from "react";
import { View, Text, Button, TextInput, StyleSheet, Image, TouchableOpacity } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [mail, onChangeMail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [isButtonActive, changeButtonActiveness] = React.useState(false);

  const checkIfCanLogin = () => {
    const isActive = mail.length > 0 && password.length > 0;
    changeButtonActiveness(isActive);
    console.log(isActive);
  };

  return (
      <View style={styles.container}>
        <View style={{flex: 3, justifyContent: "center", margin: 20, alignItems: "center", alignItems: "stretch", marginHorizontal: 40}}>
          <Image style={{height: 300, width: 300}} source={require('../assets/logo.png')}/>
            <TextInput
                style={styles.input}
                onChangeText={ text => {
                  onChangeMail(text);
                  checkIfCanLogin();
                } }
                value={mail}
                autoCompleteType="email"
                />
            <Text>Mail</Text>
            <TextInput
                style={styles.input}
                onChangeText={ text => { 
                  onChangePassword(text);
                  checkIfCanLogin();
                }}
                secureTextEntry
                value={password}
                autoCompleteType="password"
                />
            <Text>Hasło</Text>
        </View>            
        <View style={{ flex: 1, justifyContent: "flex-end"}}>
            <Button
                styles={styles.button}
                title="Zaloguj się"
                disabled={!isButtonActive}
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
    backgroundColor: "#fff",
  }
});

export default LoginScreen;