import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NewPost from './NewPost';

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();

  const { userID, username } = route.params || {};
  // console.log('Nombre de usuario:', username);

  const [data, setData] = useState([
    { id: '1', username: 'Alonso Garcia', post: '¡Si estás listo para comenzar tu viaje como programador *Contáctame Ahora*!', image: require('../../assets/cursos.jpg'), likes: 0, comments: [], isActive: true },
    { id: '2', username: 'Giancarlos Velasquez', post: '¡Al principio todo es difícil antes de ser fácil!', image: require('../../assets/perfil.jpeg'), likes: 0, comments: [], isActive: true },
    { id: '3', username: 'Michael Vega', post: '¡Sonríe y disfruta de la vida al máximo, y logra lo imposible!', image: require('../../assets/michael.jpg'), likes: 0, comments: [], isActive: true },
    { id: '4', username: 'Jarol Eslava', post: '¡Entrenando Sin Parar en el Gym!', image: require('../../assets/jarol.jpg'), likes: 0, comments: [], isActive: true },
  ]);

  const [newPost, setNewPost] = useState({ username: username, post: '', image: null });
  const [modalVisible, setModalVisible] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);

  const onPostChange = (updatedPost) => {
    setNewPost(updatedPost);
  };

  const onPublish = () => {
    axios
      .post('http://192.168.56.1:3000/posts/posts', {
        UserID: userID, // Usar el ID de usuario obtenido del parámetro de ruta
        Contenido: newPost.post,
        Username: newPost.username,
      })
      .then((response) => {
        console.log('Publicación creada exitosamente:', response.data);
        // Crear la nueva publicación con todos los detalles necesarios
        const newPublication = {
          id: response.data.id,
          username: newPost.username,
          post: newPost.post,
          image: newPost.image,
          likes: 0,
          comments: [],
          isActive: true,
        };
        // Actualizar el estado data agregando la nueva publicación
        setData((prevData) => [newPublication, ...prevData]);
      })
      .catch((error) => {
        console.error('Error al crear publicación:', error.response);
      });
    
    // Limpiar el estado de newPost después de publicar
    setNewPost({ username: username, post: '', image: null });
  };

  const handleLike = (postId) => {
    const updatedData = data.map((post) => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });

    setData(updatedData);
  };

  const handleComment = (postId) => {
    setModalVisible(true);
    setSelectedPostId(postId);
  };

  const handlePublishComment = () => {
    const updatedData = data.map((post) => {
      if (post.id === selectedPostId) {
        return { ...post, comments: [...post.comments, { username: username, text: commentText }] };
      }
      return post;
    });

    setData(updatedData);
    setModalVisible(false);
    setCommentText('');
    setSelectedPostId(null);
  };

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.username}>{item.username}</Text>
      <Text>{item.post}</Text>
      {item.image && <Image source={item.image} style={styles.postImage} />}
      <View style={styles.interactionsContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => handleDeletePost(item.id)}>
          <Icon name="trash" size={20} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.likeContainer} onPress={() => handleLike(item.id)}>
          <Icon name="thumbs-up" size={20} color="#3498db" />
          <Text style={styles.iconText}>{item.likes} Me gusta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.commentContainer} onPress={() => handleComment(item.id)}>
          <Icon name="comment" size={20} color="#3498db" />
          <Text style={styles.iconText}>{item.comments.length} Comentar</Text>
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="share" size={20} color="#3498db" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="send" size={20} color="#3498db" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="bookmark" size={20} color="#3498db" />
          </TouchableOpacity>
        </View>
      </View>

      {item.comments.length > 0 && (
        <View style={styles.commentsContainer}>
          <Text style={styles.commentsTitle}>Comentarios:</Text>
          {item.comments.map((comment, index) => (
            <View key={index} style={styles.commentItem}>
              <Text style={styles.commentUsername}>{comment.username}:</Text>
              <Text style={styles.commentText}>{comment.text}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  const handleDeletePost = (postId) => {
    const updatedData = data.map((post) => {
      if (post.id === postId) {
        return { ...post, isActive: false };
      }
      return post;
    });

    setData(updatedData);
  };
  
  const getFriendID = async (userID, friendUsername) => {
    try {
      // Consultar la base de datos para obtener el friendID del amigo seleccionado
      const response = await axios.get(`http://192.168.56.1:3000/messages/${userID}/${friendUsername}`);
      // Supongamos que la respuesta contiene el friendID del amigo seleccionado
      return response.data.friendID;
    } catch (error) {
      console.error('Error al obtener friendID:', error);
      return null;
    }
  };
    
  // Función para navegar a la pantalla de chat con el friendID
  const navigateToChat = async (friendUsername) => {
    const friendID = await getFriendID(userID, friendUsername); // Obtener el friendID del amigo seleccionado
    if (friendID) {
      navigation.navigate('Chat', { friendID });
    } else {
      console.error('No se pudo obtener el friendID.');
    }
  };

  const handleLogout = () => {
    navigation.navigate('SignIn'); // Reemplaza 'SignIn' con el nombre de tu pantalla de inicio de sesión
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido a NexusFlow</Text>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profile', { userID })}>
          <Icon name="user" size={20} color="#3498db" />
          <Text style={styles.menuText}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Explore',{ userID })}>
          <Icon name="search" size={20} color="#3498db" />
          <Text style={styles.menuText}>Explorar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Assistant')}>
          <Icon name="comments" size={20} color="#3498db" />
          <Text style={styles.menuText}>Asistente</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Icon name="sign-out" size={20} color="#3498db" />
          <Text style={styles.menuText}>Cerrar sesión</Text>
        </TouchableOpacity>

      </View>

      <NewPost newPost={newPost} onPostChange={onPostChange} onPublish={onPublish} />

      <FlatList
        data={data.filter((post) => post.isActive)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Escribe tu comentario"
              value={commentText}
              onChangeText={(text) => setCommentText(text)}
              multiline
              style={styles.commentInput}
            />
            <TouchableOpacity style={styles.commentButton} onPress={handlePublishComment}>
              <Text style={styles.commentButtonText}>Publicar comentario</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      
      <TouchableOpacity style={styles.navigationButton2} onPress={() => navigateToChat(item.username)}>
        <Text style={styles.navigationButtonText}>Ir al chat</Text>
      </TouchableOpacity>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign:'center'
  },
  postContainer: {
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 16,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginTop: 8,
  },
  interactionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    marginLeft: 8,
    color: '#3498db',
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  commentInput: {
    marginBottom: 8,
    fontSize: 16,
    minHeight: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
  },
  commentButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  commentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentsContainer: {
    marginTop: 8,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  commentUsername: {
    fontWeight: 'bold',
    marginRight: 4,
  },
  commentText: {
    flex: 1,
  },
  iconButton: {
    marginRight:16,
  },
  navigationButton: {
    position: 'absolute',
    bottom: 16,
    right: 80,
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 8,
    zIndex: 1,
  },
  navigationButton2: {
    position: 'absolute',
    bottom: 16,
    right: 150,
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 8,
    zIndex: 1,
  },
  navigationButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: '80%',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  menuItem: {
    alignItems: 'center',
  },
  menuText: {
    marginTop: 8,
    color: '#3498db',
  },
});

export default HomeScreen;
