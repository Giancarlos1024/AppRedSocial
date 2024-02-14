import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native';
import { questionsAndAnswers } from './data';

const AssistantComponent = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?', fromUser: false },
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef();

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: inputText, fromUser: true },
      ]);
      setInputText('');
    }
  };

  const handleQuestionSelection = (question) => {
    const selectedQuestion = questionsAndAnswers.find((qa) => qa.question === question);
    if (selectedQuestion) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: `Seleccionaste la pregunta: "${question}"`, fromUser: false },
        { id: prevMessages.length + 2, text: selectedQuestion.answer, fromUser: false },
      ]);
    }
  };

  useEffect(() => {
    // Desplazar hacia abajo cuando se agrega un nuevo mensaje
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    // Usa ImageBackground en lugar de View para establecer una imagen de fondo
    <ImageBackground source={require('../../assets/fondoglobal.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Agrega un componente Image para la imagen del chatbot */}
        {/* <Image source={require('../../assets/asimo.jpg')} style={styles.chatbotImage} /> */}

        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}>
          {messages.map((message) => (
            <View
            key={message.id}
            style={[
              styles.message,
              message.fromUser ? styles.userMessage : styles.chatbotMessage,
              message.isQuestion ? styles.questionMessage : null,
              message.isAnswer ? styles.answerMessage : null,
            ]}>
            <View style={styles.messageContent}>
              {message.fromUser && (
                <Image
                  source={require('../../assets/perfil.jpeg')} // Ruta de la imagen del usuario
                  style={styles.iconImage}
                />
              )}
              {message.fromUser || (
                <Image
                  source={require('../../assets/asimo.jpg')} // Ruta de la imagen del chatbot
                  style={styles.iconImage}
                />
              )}
              <Text style={[styles.messageText, message.isQuestion ? styles.questionText : null]}>
                {message.text}
              </Text>
            </View>
          </View>
          ))}
        </ScrollView>
        {questionsAndAnswers.map((qa) => (
          <TouchableOpacity
            key={qa.question}
            style={styles.questionButton}
            onPress={() => handleQuestionSelection(qa.question)}>
            <Text style={styles.questionButtonText}>{qa.question}</Text>
          </TouchableOpacity>
        ))}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escribe tu mensaje..."
            value={inputText}
            onChangeText={(text) => setInputText(text)}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    margin: 16,
    overflow: 'hidden',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  chatbotImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  iconImage: {
    width: 20, // Doble del tamaño original para hacerla redonda
    height: 20, // Doble del tamaño original para hacerla redonda
    borderRadius: 10, // Mitad del ancho y alto para hacerla redonda
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 8,
  },
  messagesContent: {
    paddingBottom: 16,
  },
  message: {
    maxWidth: '90%',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    alignSelf: 'flex-start',
    elevation: 2,
    opacity: 0.9,
  },
  messageContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3498db',
  },
  chatbotMessage: {
    backgroundColor: 'green',
    paddingHorizontal:20,
  },
  questionMessage: {
    backgroundColor: '#3498db',
  },
  answerMessage: {
    backgroundColor: '#2ecc71',
  },
  questionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  messageText: {
    color: '#000',
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginRight: 10,
    padding: 8,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: 'black',
    padding: 8,
    borderRadius: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  questionButton: {
    backgroundColor: '#3498db',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  questionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AssistantComponent;
