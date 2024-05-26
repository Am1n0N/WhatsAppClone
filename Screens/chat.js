import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import tw from "twrnc";
import firebase from "../config";

export default function Chat(props) {
  const currentid = props.route.params.currentid;
  const secondid = props.route.params.destinataire;
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const database = firebase.database();
  const refLesDiscussions = database.ref("les_discussions");
  const idDisc = currentid > secondid ? currentid + secondid : secondid + currentid;
  const refUneDiscussion = refLesDiscussions.child(idDisc);

  const refCurrentIsTyping = refUneDiscussion.child(currentid + "_isTyping");
  const refSecondIsTyping = refUneDiscussion.child(secondid + "_isTyping");

  useEffect(() => {
    refUneDiscussion.child("chat").on("value", (snapshot) => {
      let d = [];
      snapshot.forEach((child) => {
        d.push(child.val());
      });
      setMessages(d);
    });

    return () => {
      refUneDiscussion.off("value");
    };
  }, []);

  useEffect(() => {
    refSecondIsTyping.on("value", (snapshot) => {
      setIsTyping(snapshot.val());
    });

    return () => {
      refSecondIsTyping.off("value");
    };
  }, []);

  const handleSend = () => {
    const key = refUneDiscussion.push().key;
    const refUnMessage = refUneDiscussion.child("chat").child(key);
    refUnMessage.set({
      Message: msg,
      Time: new Date().toLocaleString(),
      Sender: currentid,
      Receiver: secondid,
    });
    setMsg("");
    refCurrentIsTyping.set(false);
  };

  return (
    <ImageBackground style={tw`flex-1`} source={require("../assets/bg.jpg")}>
      <FlatList
        style={tw`m-5`}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              tw`m-2 p-3 rounded-lg`,
              {
                backgroundColor: item.Sender === currentid ? "#4CAF50" : "#2196F3",
                alignSelf: item.Sender === currentid ? "flex-end" : "flex-start",
              },
            ]}
          >
            <Text style={tw`text-white`}>{item.Message}</Text>
            <Text style={tw`text-gray-200 text-xs`}>{item.Time}</Text>
          </View>
        )}
      />
      {isTyping && (
        <Text style={tw`text-white text-center text-lg`}>is typing...</Text>
      )}
      <View
        style={tw`flex-row items-center m-5 p-3 rounded-lg border-2 border-black bg-gray-700`}
      >
        <TextInput
          value={msg}
          onFocus={() => refCurrentIsTyping.set(true)}
          onBlur={() => refCurrentIsTyping.set(false)}
          onChangeText={(text) => setMsg(text)}
          style={tw`text-white text-lg bg-gray-600 p-2 rounded-lg flex-1 mr-2`}
          placeholder="Type a message"
          placeholderTextColor="#ccc"
        />
        <TouchableHighlight
          onPress={handleSend}
          style={tw`p-2 bg-green-500 rounded-full`}
        >
          <MaterialCommunityIcons name="send" size={24} color="white" />
        </TouchableHighlight>
      </View>
    </ImageBackground>
  );
}
