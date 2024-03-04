import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const SignUpScreen = ({ navigation }) => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [Nombre, setNombre] = useState('');
  const [Apellido, setApellido] = useState('');

  const handleSignUp = async () => {
    try {
      console.log('Iniciando registro...');
      //'http://192.168.56.1:3000/signup'
      const response = await axios.post('http://192.168.56.1:3000/signup', {
        Username,
        Password,
        Email,
        Nombre,
        Apellido,
      });
      console.log('Respuesta del servidor:', response.data);
      console.log(response.data);
      alert("Registro éxitoso");
      navigation.navigate('SignIn');
    } catch (error) {
      alert("El usuario ya existe");
      console.error('Error al registrar usuario:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <TextInput
        style={[styles.input, styles.shadow]} // Aplicar la sombra aquí
        placeholder="Nombres"
        value={Nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={[styles.input, styles.shadow]} // Aplicar la sombra aquí
        placeholder="Apellidos"
        value={Apellido}
        onChangeText={setApellido}
      />

      <TextInput
        style={[styles.input, styles.shadow]} // Aplicar la sombra aquí
        placeholder="Nombre de usuario"
        value={Username}
        onChangeText={setUsername}
      />

      <TextInput
        style={[styles.input, styles.shadow]} // Aplicar la sombra aquí
        placeholder="Correo Electronico"
        value={Email}
        onChangeText={setEmail}
      />

      <TextInput
        style={[styles.input, styles.shadow]} // Aplicar la sombra aquí
        placeholder="Contraseña"
        secureTextEntry
        value={Password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>¿Ya tienes una cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.linkText}>Iniciar Sesión</Text>
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

export default SignUpScreen;
