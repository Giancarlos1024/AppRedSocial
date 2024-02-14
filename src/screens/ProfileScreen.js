import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  // Reemplaza 'url_de_la_imagen' con la URL real de la imagen de tu perfil
  const profileImageUrl = require('../../assets/perfil.jpeg');

  useEffect(() => {
    const userID = 4; // Cambia esto según tu lógica de autenticación

    axios
      .get(`http://192.168.56.1:3000/user/${userID}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener detalles del usuario:', error.response);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        {/* Agrega la imagen de perfil */}
        <Image source={profileImageUrl} style={styles.profileImage} />

        {/* Información del perfil */}
        {userData && (
          <View style={styles.userInfoContainer}>
            <Text style={styles.username}>{userData.Username}</Text>
            <Text style={styles.userDetails}>Email: {userData.Email}</Text>
            <Text style={styles.userDetails}>Nombre: {userData.Nombre}</Text>
            <Text style={styles.userDetails}>Apellido: {userData.Apellido}</Text>
            {/* <Text style={styles.userDetails}>Password: {userData.Password}</Text> */}
            {/* Agrega más campos según sea necesario */}
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postsButton} onPress={() => navigation.navigate('UserPosts', { userID: userData.userID })}>
          <Text style={styles.buttonText}>Ver Publicaciones</Text>
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
  profileInfo: {
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  userInfoContainer: {
    alignItems: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userDetails: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#3498db',
    paddingVertical: 15,
    marginRight: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  postsButton: {
    flex: 1,
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    marginLeft: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
