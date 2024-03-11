import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const SignInScreen = ({ navigation }) => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://192.168.56.1:3000/auth/signin', {
        Email,
        Password,
      });
  
      console.log(response.data);
  
      const { userID, username } = response.data;
      console.log("userID:", userID); // Agregar esta línea para verificar el valor de userID
      navigation.navigate('Home', { userID, username }); // Pasar el ID de usuario y el nombre de usuario a la pantalla Home
  
    } catch (error) {
      console.error("No está registrado: " + error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Image source={require('../../assets/userApp.png')} style={styles.photo} />
      <TextInput
        style={[styles.input, styles.shadow]} // Agregar estilos de sombra aquí
        placeholder="Correo Electronico "
        value={Email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, styles.shadow]} // Agregar estilos de sombra aquí
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color:'#0BBCF3',
    fontWeight: 'bold',
  },
  input: {
    height: 53,
    backgroundColor:'white',
    marginBottom: 16,
    padding: 10,
    width: 332,
    borderRadius: 5,
    
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal:40,
    marginTop: 20,
  },
  buttonText: {
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
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,
  },
});

export default SignInScreen;
