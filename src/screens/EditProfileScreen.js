import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const EditProfileScreen = ({ navigation, route }) => {
  const [userData, setUserData] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({
    Username: '',
    Email: '',
    Nombre: '',
    Apellido: '',
    Password: '' // Puedes agregar más campos según sea necesario
  });
  const { userID } = route.params;
  // console.log("userID en EditProfileScreen:", userID);
  useEffect(() => {
    const { userID } = route.params; // Aquí accedemos directamente a route.params
    // console.log("userID en EditProfileScreen:", userID);
  
    axios
      .get(`http://192.168.56.1:3000/user/${userID}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener detalles del usuario:', error.response);
      });
  }, [userID]); // Asegúrate de incluir route.params en la lista de dependencias de useEffect

  const handleUpdate = () => {
    const { userID } = route.params; // También aquí accedemos directamente a route.params
    console.log("....userID : ", userID);
    axios
      .put(`http://192.168.56.1:3000/user/${userID}`, updatedUserData)
      .then((response) => {
        console.log('Usuario actualizado exitosamente:', response.data);
        // Puedes redirigir a la pantalla de perfil u otra pantalla después de la actualización
        navigation.navigate('Profile',{ userID });
      })
      .catch((error) => {
        if (error.response) {
          console.error('Error al actualizar usuario:', error.response);
        } else {
          console.error('Error al actualizar usuario:', error.message); // Si no hay una respuesta del servidor, muestra el mensaje de error general
        }
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
          style={[styles.input, styles.shadow]} // Aplicar la sombra aquí
          placeholder="Nombre de usuario"
          value={updatedUserData.Username}
          onChangeText={(text) => handleChange('Username', text)}
        />
        <TextInput
          style={[styles.input, styles.shadow]} // Aplicar la sombra aquí
          placeholder="Correo electrónico"
          value={updatedUserData.Email}
          onChangeText={(text) => handleChange('Email', text)}
        />
        <TextInput
          style={[styles.input, styles.shadow]} // Aplicar la sombra aquí
          placeholder="Nombre"
          value={updatedUserData.Nombre}
          onChangeText={(text) => handleChange('Nombre', text)}
        />
        <TextInput
          style={[styles.input, styles.shadow]} // Aplicar la sombra aquí
          placeholder="Apellido"
          value={updatedUserData.Apellido}
          onChangeText={(text) => handleChange('Apellido', text)}
        />
        <TextInput
          style={[styles.input, styles.shadow]} // Aplicar la sombra aquí
          placeholder="Contraseña"
          value={updatedUserData.Password}
          onChangeText={(text) => handleChange('Password', text)}
        />
        {/* Agregar más campos según sea necesario */}
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
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
  },
  updateButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
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
    elevation: 5,
  },
});

export default EditProfileScreen;
