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
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <ImageBackground source={require('../../assets/fondoglobal.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
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
              ]}>
              <View style={styles.messageContent}>
                {message.fromUser ? (
                  <Image
                    source={require('../../assets/perfil.jpeg')}
                    style={styles.iconImage}
                  />
                ) : (
                  <Image
                    source={require('../../assets/asimo.jpg')}
                    style={styles.iconImage}
                  />
                )}
                <Text style={styles.messageText}>{message.text}</Text>
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 16,
    borderRadius: 16,
    margin: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingBottom: 16,
  },
  message: {
    maxWidth: '80%',
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
    backgroundColor: '#27ae60',
  },
  messageText: {
    color: '#fff',
    marginLeft: 8,
  },
  iconImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
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
    backgroundColor: '#2ecc71',
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
