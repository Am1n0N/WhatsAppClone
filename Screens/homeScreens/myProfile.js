import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import tw from "twrnc";
import firebase from "../../config";
const database = firebase.database();

export default function MyProfile(props) {
  const currentid = props.route.params.currentid;

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [urlImage, setUrlImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setUrlImage(result.assets[0].uri);
    }
  };

  const imageToBlob = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    return blob;
  };

  const uploadLocalToStorage = async (url) => {
    const storage = firebase.storage();
    const ref_photos_des_profils = storage.ref("photos_des_profils");
    const ref_unphoto = ref_photos_des_profils.child(currentid);
    const blob = await imageToBlob(url);
    await ref_unphoto.put(blob);
    const lien = await ref_unphoto.getDownloadURL();
    return lien;
  };

  const saveData = async () => {
    if (urlImage && nom.length > 0 && prenom.length > 0 && telephone.length > 0 && pseudo.length > 0) {
      try {
        const link = await uploadLocalToStorage(urlImage);
        const refProfiles = database.ref("listProfile");
        const unProfile = refProfiles.child("unProfile" + currentid);
        await unProfile.set({
          idProfile: currentid,
          Nom: nom,
          Prenom: prenom,
          Telephone: telephone,
          Pseudo: pseudo,
          url: link
        });
        Alert.alert("Profile saved successfully");
      } catch (error) {
        Alert.alert("Error saving profile", error.message);
      }
    } else {
      Alert.alert("Please fill in all fields and upload an image");
    }
  };


  const refProfiles = database.ref("listProfile");
  const unProfile = refProfiles.child("unProfile" + currentid);
  unProfile.once("value", (datasnapshot) => {
    if (datasnapshot.exists()) {
      setNom(datasnapshot.val().Nom);
      setPrenom(datasnapshot.val().Prenom);
      setTelephone(datasnapshot.val().Telephone);
      setPseudo(datasnapshot.val().Pseudo);
      setUrlImage(datasnapshot.val().url);
    }
  });

  return (
    <View style={tw`bg-gray-200 h-full px-4 py-4`}>
      <StatusBar style="white" />
      <Text style={tw`text-4xl text-center text-stone-800 font-black my-6`}>Compte</Text>
      <View style={tw`bg-white rounded-lg items-center`}>
        <TouchableOpacity onPress={pickImage} style={tw`m-6`}>
          <Image
            source={urlImage ? { uri: urlImage } : require("../../assets/profil.png")}
            style={{ height: 150, width: 150, borderRadius: 75 }} />
        </TouchableOpacity>
        <View style={tw`bg-gray-200 h-[1px] w-11/12 self-center`} />
        <TextInput
          onChangeText={setNom} 
          value={nom}
          textAlign="center"
          placeholderTextColor="#0005"
          placeholder="Nom"
          style={tw`px-4 py-4 font-bold w-full`}
          keyboardType="default" />
        <View style={tw`bg-gray-200 h-[1px] w-11/12 self-center`} />
        <TextInput
          onChangeText={setPrenom}
          value={prenom}
          textAlign="center"
          placeholderTextColor="#0005"
          placeholder="Prenom"
          style={tw`px-4 py-4 font-bold w-full`}
          keyboardType="default" />
        <View style={tw`bg-gray-200 h-[1px] w-11/12 self-center`} />
        <TextInput
          onChangeText={setTelephone}
          value={telephone}
          placeholderTextColor="#0005"
          textAlign="center"
          placeholder="Telephone"
          style={tw`px-4 py-4 font-bold w-full`}
          keyboardType="phone-pad" />
        <View style={tw`bg-gray-200 h-[1px] w-11/12 self-center`} />
        <TextInput
          onChangeText={setPseudo}
          value={pseudo}
          placeholderTextColor="#0005"
          textAlign="center"
          style={tw`px-4 py-4 font-bold w-full`}
          placeholder="Pseudo" />
      </View>
      <TouchableOpacity
        onPress={saveData}
        disabled={!urlImage || !nom || !prenom || !telephone || !pseudo}
        activeOpacity={0.5}
        underlayColor="#DDDDDD"
        style={[
          tw`p-4 rounded-lg my-4 `,
          urlImage && nom && prenom && telephone && pseudo ? tw`bg-gray-300` : tw`bg-gray-400`
        ]}>
        <Text style={tw`text-center font-bold text-stone-600 text-lg`}>
          Save
        </Text>
      </TouchableOpacity>
    
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Authentification")}
        activeOpacity={0.5}
        underlayColor="#DDDDDD"
        style={tw`p-4 rounded-lg mb-4 bg-red-500`}>
        <Text style={tw`text-center font-bold text-white text-lg`}>
          Disconnect
        </Text>
      </TouchableOpacity>
    </View>
  );
}
