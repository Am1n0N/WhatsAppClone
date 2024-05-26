import { StatusBar } from "expo-status-bar";
import {
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";
import tw from "twrnc";
import firebase from "../config";


export default function Signup(props) {
    var email = "", password = "", confirmpassword = "";
    const auth = firebase.auth();


    function Signup() {
        if (password !== confirmpassword) {
            alert("passwords not match");
            return;
        }
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const currentid = auth.currentUser.uid;
                navigation.replace("Home", { currentid: currentid });
                alert("account created");
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
            });
    }
    const { navigation } = props;
    return (
        <View style={tw`bg-gray-200 h-full`}>
            <View style={tw`flex mx-4 my-4 h-full`}>
                <Text style={tw`font-semibold text-stone-500 mx-4 my-4 leading-5 `}>WhatsApp devra vérifier votre compte. Des frais de transport peuvent s'appliquer.</Text>
                <View style={tw`bg-white  rounded-lg`}>
                    <TextInput
                        onChangeText={(ch) => {email = ch;}}
                        placeholder="Email"
                        keyboardType="email-address"
                        style={tw`px-4 py-3 font-bold`}
                    ></TextInput>
                    <View style={tw`bg-gray-200 h-[1px] w-11/12 self-center`} />
                    <TextInput
                        onChangeText={(ch) => {password = ch;}}
                        placeholder="Password"
                        secureTextEntry={true}
                        style={tw`px-4 py-3 font-bold`}
                    ></TextInput>
                    <View style={tw`bg-gray-200 h-[1px] w-11/12 self-center`} />
                    <TextInput
                        onChangeText={(ch) => {confirmpassword = ch;}}
                        placeholder="Confirm password"
                        secureTextEntry={true}
                        style={tw`px-4 py-3 font-bold `}
                    ></TextInput>
                </View>
                <Text style={tw`font-semibold text-center text-stone-500 mx-4 my-4 leading-5 `}>
                    Vous devez avoir <Text style={tw` text-blue-500`}>au moins 16 ans</Text> pour vous inscrire. Découvrez comment WhatsApp fonctionne avec les <Text style={tw` text-blue-500`}>Sociétés Facebook.</Text>
                </Text>
                <View style={tw`flex mt-56 gap-1`}>
                    <Pressable
                        onPress={Signup}
                        style={tw`bg-gray-300 p-4 rounded-lg`}>
                        <Text style={tw`text-center  font-bold text-stone-600 text-lg`}>Register</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => { navigation.goBack(); }}
                        style={tw`bg-blue-300 p-4 rounded-lg`}
                    >
                        <Text style={tw`text-center  font-bold text-stone-600 text-lg`}>Back</Text>
                    </Pressable>
                </View>
            </View>

            <StatusBar style="light" />
        </View>
    );
}
