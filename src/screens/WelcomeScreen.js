// WelcomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleStart = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NexusFlow</Text>
      <Image source={require('../../assets/perfil.jpeg')} style={styles.photo} />
      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startButtonText}>Empezar</Text>
      </TouchableOpacity>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>¿No tienes una cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.linkText}>Regístrate aquí</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 12,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    marginTop: 20, // Ajusta el espaciado según sea necesario
    alignItems: 'center',
  },
  signupText: {
    fontSize: 16,
  },
  linkText: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: 'bold',
  },
  photo: {
    width: 300,
    height: 300,
    borderRadius: 150,
    marginVertical: 16,
  },
});

export default WelcomeScreen;
