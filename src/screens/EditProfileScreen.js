import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const EditProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({
    Username: '',
    Email: '',
    Nombre: '',
    Apellido: '',
    Password: '' // Aquí puedes agregar más campos según sea necesario
  });

  useEffect(() => {
    const userID = 1; // Cambia esto según tu lógica de autenticación

    axios
      .get(`http://192.168.56.1:3000/user/${userID}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener detalles del usuario:', error.response);
      });
  }, []);

  const handleUpdate = () => {
    const userID = 1; // Cambia esto según tu lógica de autenticación

    axios
      .put(`http://192.168.56.1:3000/user/${userID}`, updatedUserData)
      .then((response) => {
        console.log('Usuario actualizado exitosamente:', response.data);
        // Puedes redirigir a la pantalla de perfil u otra pantalla después de la actualización
      })
      .catch((error) => {
        console.error('Error al actualizar usuario:', error.response);
      });
  };

  const handleChange = (field, value) => {
    setUpdatedUserData({ ...updatedUserData, [field]: value });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        {/* Campos de edición del perfil */}
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          value={updatedUserData.Username}
          onChangeText={(text) => handleChange('Username', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={updatedUserData.Email}
          onChangeText={(text) => handleChange('Email', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={updatedUserData.Nombre}
          onChangeText={(text) => handleChange('Nombre', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={updatedUserData.Apellido}
          onChangeText={(text) => handleChange('Apellido', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={updatedUserData.Password}
          onChangeText={(text) => handleChange('Password', text)}
        />
        {/* Agrega más campos según sea necesario */}
      </View>

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Actualizar Perfil</Text>
      </TouchableOpacity>
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
  profileInfo: {
    width: '100%',
  },
  input: {
    backgroundColor: '#ecf0f1',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  updateButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
