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
      <Image source={require('../../assets/logoApp.png')} style={styles.photo} />
      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startButtonText}>Empezar</Text>
      </TouchableOpacity>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>¿No tienes una cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.linkText}>Regístrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centrar verticalmente
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    color:'#0BBCF3',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: 'black',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 20,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 16,
  },
  linkText: {
    color: '#FD0505',
    fontSize: 16,
    fontWeight: 'bold',
  },
  photo: {
    width: 200, // Reducir el tamaño de la foto
    height: 200,
    borderRadius: 100, // Ajustar el borde para que sea circular
    marginVertical: 20, // Reducir el margen vertical
  },
});

export default WelcomeScreen;
