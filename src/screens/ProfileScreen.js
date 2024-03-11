import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = ({ navigation, route }) => {
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { userID } = route.params;
    console.log('userID:', userID); // Verifica si se está obteniendo correctamente el userID de los route.params
    
    if (userID) {
      axios
        .get(`http://192.168.56.1:3000/users/user/${userID}`)
        .then((response) => {
          setUserData(response.data);
          setLoading(false); // Actualizar el estado de loading después de obtener los datos del usuario
        })
        .catch((error) => {
          console.error('Error al obtener detalles del usuario:', error.response);
          setLoading(false); // Asegurar que se actualice el estado de loading en caso de error
        });
    }
  }, [route.params]);

  // console.log('userData:', userData); // Agrega esta línea para verificar el estado actual de userData
  
  

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log('Imagen seleccionada:', result.uri); // Verifica si la imagen se seleccionó correctamente
      setProfileImage(result.uri);
      uploadProfileImage(result.uri);
    }
  };

  const uploadProfileImage = async (imageUri) => {
    try {
      if (!userData) {
        console.error('No se ha cargado userData todavía.');
        return;
      }
  
      const userID = userData.UserID; // Usar userData.UserID en lugar de userData.userID
      console.log('userID:', userID); // Verifica si se está obteniendo correctamente el userID del userData
  
      const formData = new FormData();
      formData.append('avatar', {
        uri: imageUri,
        name: 'avatar.jpg',
        type: 'image/jpeg',
      });
  
      const response = await axios.post(`http://192.168.56.1:3000/upload/avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          userID: userID,
        },
      });
  
      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al subir la imagen de perfil:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={profileImage ? { uri: profileImage } : require('../../assets/userApp.png')} style={styles.profileImage} />
        </TouchableOpacity>

        {userData && (
          <View style={styles.userInfoContainer}>
            <Text style={styles.username}>{userData.Username}</Text>
            <Text style={styles.userDetails}>Email: {userData.Email}</Text>
            <Text style={styles.userDetails}>Nombre: {userData.Nombre}</Text>
            <Text style={styles.userDetails}>Apellido: {userData.Apellido}</Text>
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => {
          if (!loading && userData && userData.UserID) {
            console.log("userID que se pasa a EditProfile:", userData.UserID);
            navigation.navigate('EditProfile', { userID: userData.UserID });
          } else {
            console.log("Los datos del usuario aún no se han cargado o userID no está disponible.");
          }
        }}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>






        <TouchableOpacity style={styles.postsButton} onPress={() => navigation.navigate('UserPosts', { userID: userData.UserID })}>
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
