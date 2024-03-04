import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

const ExploreScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular una pequeña demora antes de cargar los datos
    const timer = setTimeout(() => {
      const dummyUsers = [
        { userID: 1, username: 'user1', avatar: require('../../assets/michael.jpg') },
        { userID: 2, username: 'user2', avatar: require('../../assets/perfil.jpeg') },
        { userID: 3, username: 'user3', avatar: require('../../assets/userApp.png') },
      ];
      setUsers(dummyUsers);
      setLoading(false);
    }, 1500);

    // Limpiar el temporizador en la limpieza del efecto
    return () => clearTimeout(timer);
  }, []);

  const addFriend = async (friendID) => {
    try {
      // Simulación de agregar amigo
      console.log(`Agregando amigo con ID: ${friendID}`);
    } catch (error) {
      console.error('Error al agregar amigo:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.userContainer}>
      <View style={styles.avatarContainer}>
        {item.avatar ? (
          <Image style={styles.avatar} source={item.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarPlaceholderText}>Avatar no disponible</Text>
          </View>
        )}
      </View>
      <Text style={styles.username}>{item.username}</Text>
      {item.userID && (
        <TouchableOpacity onPress={() => addFriend(item.userID)} style={styles.addButton}>
          <Text style={styles.addButtonText}>Agregar amigo</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Descubre nuevos usuarios</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.userID.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#3498db',
  },
  userContainer: {
    marginRight: 16,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 8,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  username: {
    textAlign: 'center',
    color: '#555',
  },
  addButton: {
    marginTop: 4,
    backgroundColor: '#3498db',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  addButtonText: {
    color: '#fff',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholderText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ExploreScreen;
