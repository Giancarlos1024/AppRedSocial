import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const UserPostsScreen = ({ navigation, route }) => {
  const [userPosts, setUserPosts] = useState([]);
  const { userID } = route.params;

  useEffect(() => {
    axios
      .get(`http://192.168.56.1:3000/posts?userID=${userID}`)
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  postList: {
    width: '100%',
  },
  postItem: {
    backgroundColor: '#ecf0f1',
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  likes: {
    color: 'blue',
  },
  comments: {
    color: 'green',
  },
});

export default UserPostsScreen;
