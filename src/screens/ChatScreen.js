// Componente para la pantalla de chat
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { friendID } = route.params; // ID del amigo con el que se está chateando

  useEffect(() => {
    // Obtener el historial de mensajes entre el usuario y su amigo del servidor
    axios.get(`http://192.168.56.1:3000/messages/${friendID}`)
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error('Error al obtener historial de mensajes:', error);
      });
  }, []);

  const sendMessage = () => {
    // Enviar el nuevo mensaje al servidor
    axios.post('http://192.168.56.1:3000/messages/send', {
      senderID: userID, // ID del usuario
      receiverID: friendID,
      content: newMessage
    })
    .then(response => {
      // Agregar el nuevo mensaje a la lista de mensajes
      setMessages([...messages, response.data]);
      // Limpiar el campo de entrada de mensajes
      setNewMessage('');
    })
    .catch(error => {
      console.error('Error al enviar mensaje:', error);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={{ padding: 8 }}>
            <Text>{item.content}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginRight: 8 }}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Escribe tu mensaje..."
        />
        <TouchableOpacity
          style={{ backgroundColor: '#3498db', padding: 8, borderRadius: 8 }}
          onPress={sendMessage}
        >
          <Text style={{ color: '#fff' }}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
