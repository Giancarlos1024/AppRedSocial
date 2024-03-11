import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator, TextInput, Alert } from 'react-native';
import axios from 'axios';

const ExploreScreen = ({ navigation, route }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [requestSent, setRequestSent] = useState([]);

  const { userID } = route.params;

  useEffect(() => {
    axios.get('http://192.168.56.1:3000/users/users')
      .then(response => {
        const filteredUsers = response.data.filter(user => user.UserID !== userID);
        const sortedUsers = filteredUsers.sort((a, b) => a.Username.localeCompare(b.Username));
        setUsers(sortedUsers);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener usuarios:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    const filteredUsers = users.filter(user =>
      user.Username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredUsers;
  };

  const handleSendRequest = (userId) => {
    if (requestSent.includes(userId)) {
      Alert.alert('Solicitud ya enviada', 'Ya has enviado una solicitud de amistad a este usuario.');
    } else {
      axios.post(`http://192.168.56.1:3000/users/addfriend`, { userID, friendID: userId })
        .then(response => {
          setRequestSent([...requestSent, userId]);
          Alert.alert('Solicitud enviada', 'Tu solicitud de amistad ha sido enviada exitosamente.');
        })
        .catch(error => {
          console.error('Error al enviar solicitud:', error);
          Alert.alert('Error', 'Hubo un error al enviar la solicitud de amistad. Por favor, inténtalo de nuevo.');
        });
    }
  };

  const renderUserItem = ({ item }) => (
    <TouchableOpacity style={styles.userContainer}>
      <View style={styles.avatarContainer}>
        {item.Avatar ? (
          <Image style={styles.avatar} source={{ uri: item.Avatar }} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarPlaceholderText}>Avatar no disponible</Text>
          </View>
        )}
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.username}>{item.Username}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => handleSendRequest(item.UserID)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Descubre nuevos usuarios</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar usuarios"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
        </View>
      ) : (
        <FlatList
          data={handleSearch()}
          keyExtractor={(item) => item.UserID.toString()}
          renderItem={renderUserItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.userList}
        />
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  userList: {
    marginTop: 8,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginRight: 16,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20, // Ajuste del radio del borde para hacer un botón circular
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20, // Ajuste del tamaño de fuente para hacer el botón más grande
  },
});

export default ExploreScreen;
