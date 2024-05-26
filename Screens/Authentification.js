import { StatusBar } from "expo-status-bar";
import { BackHandler, Pressable, Text, TextInput, View } from "react-native";
import firebase from "../config";

import tw from "twrnc";

export default function Authentification(props) {
  var email, password;
  const auth = firebase.auth();
  const { navigation } = props;

  function Login() {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const currentid = auth.currentUser.uid;
        navigation.replace("Home", { currentid: currentid });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  }

  return (
    <View style={tw`bg-gray-200 h-full`}>
      <View style={tw`flex mx-4 my-4 h-full`}>
        <Text style={tw`font-semibold text-stone-500 mx-4 my-4 leading-5 `}>WhatsApp devra vérifier votre compte. Des frais de transport peuvent s'appliquer.</Text>
        <View style={tw`bg-white rounded-lg`}>
          <TextInput
            onChangeText={(ch) => { email = ch; }}
            placeholder="Email"
            keyboardType="email-address"
            style={tw`px-4 py-4 font-bold `}
          />
          <View style={tw`bg-gray-200 h-[1px] w-11/12 self-center`} />
          <TextInput
            onChangeText={(ch) => { password = ch; }}
            placeholder="Password"
            secureTextEntry={true}
            style={tw`px-4 py-4 font-bold `}
          />
        </View>
       
        <View style={tw`flex mt-72 gap-1`}>
          <Pressable style={tw`bg-gray-300 p-4 rounded-lg`} onPress={Login}>
            <Text style={tw`text-center  font-bold text-stone-600 text-lg`}>Connecter</Text>
          </Pressable>
          <Pressable
            style={tw`bg-red-400 p-4 rounded-lg`}
            onPress={() => { BackHandler.exitApp(); }} >
            <Text style={tw`text-center text-stone-100 font-bold text-lg`}>Quitter</Text>
          </Pressable>
        </View>
        <Text
          onPress={() => { navigation.navigate("Signup"); }}
          style={tw`mt-4 w-full text-right text-stone-800 pr-5`}
        >
          Créer un nouveau compte
        </Text>
      </View>
      <StatusBar style="light" />
    </View>
  );
}