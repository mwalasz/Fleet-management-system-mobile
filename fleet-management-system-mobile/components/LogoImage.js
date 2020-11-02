import * as React from "react";
import { Image, StyleSheet } from "react-native";

const LogoImage = () => {
    return <Image style={styles} source={require('../assets/logo.png')}/>;
};

const size = 300;
const styles = StyleSheet.create({
    height: size,
    width: size,
});

export default LogoImage;