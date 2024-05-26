import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  Linking,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Dialog, Button } from "react-native-paper";
import tw from "twrnc";
import firebase from "../../config";
const database = firebase.database();

export default function ListProfils(props) {
  const currentid = props.route.params.currentid;
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [itemSelected, setItemSelected] = useState({});
  const [data, setData] = useState([]);
  const reflistProfiles = database.ref("listProfile");

  useEffect(() => {
    const unsubscribe = reflistProfiles.on("value", (snapshot) => {
      const profiles = [];
      snapshot.forEach((un_profil) => {
        if (un_profil.val().idProfile !== currentid) {
          profiles.push(un_profil.val());
        }
      });
      setData(profiles);
    });


    return () => reflistProfiles.off("value", unsubscribe);
  }, [currentid]);

  return (
    <View style={tw`bg-gray-200 h-full px-4 py-4`}>
      <Text style={tw`text-4xl text-center text-stone-800 font-black my-6`}>
        List Profils
      </Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.idProfile}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`bg-white p-4 m-2 rounded-lg flex-row items-center shadow-md`}
            onPress={() => {
              setDialogVisible(true);
              setItemSelected(item);
            }}
          >
            <Image
              source={item.url ? { uri: item.url } : require("../../assets/profil.png")}
              style={tw`h-12 w-12 rounded-full`}
            />
            <Text style={tw`ml-4 text-lg font-semibold`}>{item.Pseudo}</Text>
            {/* chat button */}
            <Button
              mode="contained"
              onPress={() => {
                props.navigation.navigate("Chat", {
                  currentid: currentid,
                  destinataire: item.idProfile,
                });
              }}
              style={tw`bg-green-500 ml-auto`}
              labelStyle={tw`text-white`}
            >
              Chat
            </Button>
          </TouchableOpacity>
        )}
      />

      <Dialog
        visible={isDialogVisible}
        onDismiss={() => setDialogVisible(false)}
        style={tw`p-4 rounded-lg`}
      >
        <Dialog.Title style={tw`text-center text-xl font-bold`}>Profile Details</Dialog.Title>
        <Dialog.Content>
          <ScrollView contentContainerStyle={tw`items-center`}>
            <Image
              source={itemSelected.url ? { uri: itemSelected.url } : require("../../assets/profil.png")}
              style={tw`h-24 w-24 rounded-full mb-4`}
            />
            <Text style={tw`text-lg font-bold mb-2`}>{itemSelected.Nom}</Text>
            <Text style={tw`text-lg mb-1`}>Prenom: {itemSelected.Prenom}</Text>
            <Text style={tw`text-lg mb-1`}>Telephone: {itemSelected.Telephone}</Text>
            <Text style={tw`text-lg mb-1`}>Pseudo: {itemSelected.Pseudo}</Text>
          </ScrollView>
        </Dialog.Content>
        <Dialog.Actions style={tw`justify-around`}>
          <Button
            mode="contained"
            onPress={() => {
              if (Platform.OS === "android") {
                Linking.openURL(`tel:${itemSelected.Telephone}`);
              } else {
                Linking.openURL(`telprompt:${itemSelected.Telephone}`);
              }
            }}
            style={tw`bg-blue-500 w-28`}
            labelStyle={tw`text-white`}
          >
            Call
          </Button>

          <Button
            mode="text"
            onPress={() => setDialogVisible(false)}
            style={tw`bg-red-500 w-28`}
            labelStyle={tw`text-white`}
          >
            Cancel
          </Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}
