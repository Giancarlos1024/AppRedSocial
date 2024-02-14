import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import perfilImage from '../../assets/perfil.jpeg'; // Importa la imagen

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
      alert("El usuario ya éxiste");
      console.error('Error al registrar usuario:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombres"
        value={Nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellidos"
        value={Apellido}
        onChangeText={setApellido}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={Username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo Electronico"
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
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>¿Ya tienes una cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.linkText}>Iniciar Sesión aquí</Text>
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
});

export default SignUpScreen;
