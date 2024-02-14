import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const ExploreScreen = () => {
  const suggestedUsers = [
    { id: '1', username: 'usuario1', avatar: require('../../assets/perfil.jpeg') },
    { id: '2', username: 'usuario2', avatar: require('../../assets/michael.jpg') },
    // Agrega más usuarios sugeridos según sea necesario
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.userContainer}>
      <Image style={styles.avatar} source={item.avatar} />
      <Text style={styles.username}>{item.username}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Descubre nuevos usuarios</Text>

      <FlatList
        data={suggestedUsers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      {/* Agrega más contenido según sea necesario */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  username: {
    textAlign: 'center',
    color: '#555',
  },
});

export default ExploreScreen;
