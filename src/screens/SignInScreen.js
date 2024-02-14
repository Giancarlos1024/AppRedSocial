import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const SignInScreen = ({ navigation }) => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://192.168.56.1:3000/signin', {
        Email,
        Password,
      });

      console.log(response.data);

      const { userID, username } = response.data;
      navigation.navigate('Home', { userID, username }); // Pasar el ID de usuario y el nombre de usuario a la pantalla Home

    } catch (error) {
      console.error("No está registrado: " + error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Image source={require('../../assets/perfil.jpeg')} style={styles.photo} />
      <TextInput
        style={styles.input}
        placeholder="Correo Electronico "
        value={Email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={Password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  signupContainer: {
    marginTop: 20,
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
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 16,
  },
});

export default SignInScreen;
