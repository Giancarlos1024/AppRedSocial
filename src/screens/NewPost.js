import React from 'react';
import { View, TextInput, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

const NewPost = ({ newPost, onPostChange, onPublish }) => {
  return (
    <View style={styles.newPostContainer}>
      <TextInput
        placeholder="¿Qué estás pensando?"
        value={newPost.post}
        onChangeText={(text) => onPostChange({ ...newPost, post: text })}
        multiline
        style={styles.postInput}
      />
      {newPost.image && <Image source={newPost.image} style={styles.postImage} />}
      <TouchableOpacity style={styles.publishButton} onPress={onPublish}>
        <Text style={styles.publishButtonText}>Publicar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  newPostContainer: {
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 16,
  },
  postInput: {
    marginBottom: 8,
    fontSize: 16,
    minHeight: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
  publishButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  publishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewPost;
