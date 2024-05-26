import * as DocumentPicker from "expo-document-picker";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";

import firebase from "../../config";
const storage = firebase.storage();
const database = firebase.database();

export default function Groups(props) {
  const currentid = props.route.params.currentid;

  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Telephone, setTelephone] = useState("");
  const [Pseudo, setPseudo] = useState("");
  const [urlImage, seturlImage] = useState();

  const [FileUri, setFileUri] = useState();

  const ref_currentuser = database.ref("listProfile").child("unProfile" + currentid);
  ref_currentuser.once("value", (snapshot) => {
    setNom(snapshot.val().Nom);
    setPrenom(snapshot.val().Prenom);
    setTelephone(snapshot.val().Telephone);
    setPseudo(snapshot.val().Pseudo);
    seturlImage(snapshot.val().url);
  });


  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    console.log(result.assets[0].uri);
    setFileUri(result.assets[0].uri);
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
      xhr.responseType = "blob"; //bufferArray
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    return blob;
  };

  const uploadLocalFileToStorage = async (url) => {
    const ref_file = storage.ref("projets").child(currentid);
    const blob = await imageToBlob(url);
    await ref_file.put(blob);
    const lien = await ref_file.getDownloadURL();
    return lien;
  };

  const [msg, setmsg] = useState();

  const handleSend = () => {
    const ref_forum = database.ref("forum");
    const key = ref_forum.push().key;
    const ref_message = ref_forum.child(key);
    ref_message.set({
      Message: msg,
      Time: new Date().toLocaleString(),
      Sender: currentid,
      Nom: Nom,
      Prenom: Prenom,
      UrlImage: urlImage,
    });
    setmsg("");

  };

  // data: contenu de la reference 'forum' que vous devez la recuperer
  const [data, setData] = useState();

  const ref_forum = database.ref("forum");
  // recuperer içi le contenu de la reference 'forum' =>
  useEffect(() => {
    ref_forum.on("value", (snapshot) => {
      const d = [];
      snapshot.forEach((child) => {
        d.push(child.val());
      });
      setData(d);
    });

    return () => {
      ref_forum.off("value");
    }
  }, []);

  const Sendfile = async () => {
    await uploadLocalFileToStorage(FileUri);
    const ref_forum = database.ref("forum");
    const key = ref_forum.push().key;
    const ref_message = ref_forum.child(key);
    ref_message.set({
      Message: FileUri,
      Time: new Date().toLocaleString(),
      Sender: currentid,
      Nom: Nom,
      Prenom: Prenom,
      UrlImage: urlImage,
    });
  }

  return (
    <ImageBackground
      style={{ flex: 1, alignItems: "center" }}
      source={require("../../assets/pngtre.jpg")}
    >
      <FlatList
        inverted
        data={data}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width: "310",
                margin: 5,
                height: "auto",
                alignItems: "flex-end",
                alignSelf: item.Sender === currentid ? "flex-end" : "flex-start",
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  {item.Nom} {item.Prenom}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  {item.Time}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "#f4f4f455",
                  elevation: 2,
                  height: "auto",
                  width: 300,
                  borderWidth: 2,
                  borderColor: "white",
                  alignItems: "center",
                  flexDirection: "row",
                  padding: 10,
                }}
              >
                <Image
                  source={{ uri: item.UrlImage }}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 20,
                    marginRight: 15,
                  }}
                ></Image>
                <Text>
                  {item.Message}
                </Text>
              </View>
            </View>
          );
        }}
        style={{ height: "100%", width: "95%", margin: 10 }}
      ></FlatList>

      <Text style={{ fontSize: 8, fontWeight: "bold", color: "red" }}>{FileUri ?? "nothing"}</Text>
      <Button onPress={pickDocument} title="Select file"></Button>
      <Button onPress={Sendfile} title="Send work"></Button>
      <View
        style={{
          flexDirection: "row",
          margin: 5,
          borderColor: "black",
          borderWidth: 2,
          borderRadius: 5,
          padding: 5,
        }}
      >
        <TextInput
          onChangeText={(ch) => {
            setmsg(ch);
          }}
          style={{
            color: "black",
            fontSize: 14,
            fontWeight: "bold",
            backgroundColor: "#fff4",
            width: "85%",
            marginRight: 10,
          }}
        ></TextInput>
        <TouchableHighlight onPress={handleSend}>
          <Image
            source={require("../../assets/send msg.png")}
            style={{ width: 40, height: 40 }}
          ></Image>
        </TouchableHighlight>
      </View>
    </ImageBackground>
  );
}
