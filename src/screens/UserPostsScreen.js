import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const UserPostsScreen = ({ navigation, route }) => {
  const [userPosts, setUserPosts] = useState([]);
  const { userID } = route.params;

  useEffect(() => {
    axios
      .get(`http://192.168.56.1:3000/posts/posts?userID=${userID}`)
      .then((response) => {
        setUserPosts(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener publicaciones:', error.response);
      });
  }, [userID]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.postItem} onPress={() => handlePostPress(item)}>
      <Text style={styles.username}>{item.Username}</Text>
      <Text style={styles.postContent}>{item.Contenido}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.likes}>{item.Likes} Me gusta</Text>
        <Text style={styles.comments}>{item.Comentarios} Comentarios</Text>
      </View>
    </TouchableOpacity>
  );

  const handlePostPress = (post) => {
    console.log('Publicación seleccionada:', post);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={userPosts}
        renderItem={renderItem}
        keyExtractor={(item) => item.PostID.toString()}
        style={styles.postList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  postList: {
    flex: 1,
  },
  postItem: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
    color: '#333',
  },
  postContent: {
    fontSize: 14,
    marginBottom: 10,
    color: '#555',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  likes: {
    color: '#3498db',
    fontSize: 12,
  },
  comments: {
    color: '#27ae60',
    fontSize: 12,
  },
});

export default UserPostsScreen;
