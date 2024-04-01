import { StatusBar } from "expo-status-bar";

import {
  BackHandler,
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import firebase from "../config";
 
export default function Authentification(props) {
  var email, password;

  const auth = firebase.auth();
  const { navigation } = props;

  function Login() {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        navigation.replace("Home");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  }
  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.container}
    >
      <View
        style={{
          width: "95%",
          height: 280,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0004",
          borderRadius: 15,
          borderWidth: 1,
          borderColor: "white",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 32,
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          Bienvenue
        </Text>
 
        <TextInput
          onChangeText={(ch) => {
            email = ch;
          }}
          placeholder="your email"
          keyboardType="email-address"
          style={styles.TextInput}
        ></TextInput>
        <TextInput
          onChangeText={(ch) => {
            password = ch;
          }}
          placeholder="your password"
          secureTextEntry={true}
          style={styles.TextInput}
        ></TextInput>
 
        <View style={{ flexDirection: "row" }}>
          <Button
            onPress={Login}
            title="Connect"
          ></Button>
          <Button
            onPress={() => {
              BackHandler.exitApp();
            }}
            title="Exit"
          ></Button>
        </View>
        <Text
          onPress={() => {
            navigation.navigate("Signup");
          }}
          style={{
            textAlign: "right",
            width: "100%",
            paddingRight: 20,
            color: "white",
          }}
        >
          Creat new account
        </Text>
      </View>
      <StatusBar style="light" />
    </ImageBackground>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0ff",
    alignItems: "center",
    justifyContent: "center",
  },
  TextInput: {
    width: "85%",
    height: 50,
    margin: 10,
    borderRadius: 7,
    backgroundColor: "white",
    textAlign: "center",
    color: "#48f",
    fontSize: 14,
    fontWeight: "bold",
  },
});