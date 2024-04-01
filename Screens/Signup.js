import { StatusBar } from "expo-status-bar";
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
 
export default function Signup(props) {
  var email="", password="", confirmpassword="";
  
    function Signup() {
    if (password === confirmpassword && password.length > 5) {
     navigation.replace("Home");
    }
    else{
        alert("verifier votre mot de passe");
    }
    }
  const { navigation } = props;
  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.container}
    >
      <View
        style={{
          width: "95%",
          height: 310,
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
            color: "#999",
            fontSize: 32,
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          Creat new account
        </Text>
        <TextInput
          onChangeText={(ch) => {
            email = ch;
          }}
          placeholder="your email"
          keyboardType="email-address"
          style={styles.textInput}
        ></TextInput>
        <TextInput
          onChangeText={(ch) => {
            password = ch;
          }}
          placeholder="your password"
          secureTextEntry={true}
          style={styles.textInput}
        ></TextInput>
        <TextInput
          onChangeText={(ch) => {
            confirmpassword = ch;
          }}
          placeholder="confirm password"
          secureTextEntry={true}
          style={styles.textInput}
        ></TextInput>
 
        <View style={{ flexDirection: "row" }}>
          <Button
            onPress={Signup}
            title="Register"
          ></Button>
          <Button onPress={() => {
            navigation.goBack();
          }} title="Back"></Button>
        </View>
      </View>
 
      <StatusBar style="light" />
    </ImageBackground>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#055",
    alignItems: "center", //alignement horizontale
    justifyContent: "center",
  },
  textInput: {
    width: "85%",
    height: 50,
    margin: 10,
    borderRadius: 7,
    backgroundColor: "white",
    textAlign: "center",
    color: "#999",
    fontSize: 14,
    fontWeight: "bold",
  },
});
 