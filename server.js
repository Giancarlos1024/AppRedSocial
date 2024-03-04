const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const multer = require('multer'); // Agrega esta línea para importar Multer
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Configuración de conexión a SQL Server
const config = {
  user: 'SA',
  password: 'ALUMNO',
  server: 'localhost',
  database: 'AplicacionMovilRedSocial',
  options: {
    trustedConnection: true,
    trustServerCertificate: true,  // Agrega esta línea para desactivar la validación del certificado
  },
};

app.use(express.json());
app.use(cors());



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Directorio donde se guardarán las imágenes de perfil
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // Renombrar la imagen con un nombre único
  }
});

const upload = multer({ storage: storage });







// ENDOPOINT REGISTRO

app.post('/signup', async (req, res) => {
  try {
    console.log('Recibiendo solicitud de registro:', req.body);

    // Conectar a la base de datos
    await sql.connect(config);

    // Verificar si el usuario ya está registrado
    const checkUser = await sql.query`SELECT * FROM Usuarios WHERE Email = ${req.body.Email}`;
    if (checkUser.recordset.length > 0) {
      // El usuario ya está registrado
      res.status(400).json({ error: 'El usuario ya está registrado.' });
      return;
    }

    // Ejemplo de inserción de usuario en la tabla Users
    console.log('Antes de la inserción en la base de datos');
    const result = await sql.query`INSERT INTO Usuarios (Username, Password, Email, Nombre, Apellido) VALUES (${req.body.Username}, ${req.body.Password}, ${req.body.Email},${req.body.Nombre},${req.body.Apellido})`;
    console.log('Después de la inserción en la base de datos');

    // Cerrar la conexión
    await sql.close();

    res.json({ message: 'Usuario registrado exitosamente.' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error en el servidor.' });
  }
});

// ENDOPOINT INICIO DE SESION

app.post('/signin', async (req, res) => {
  try {
    // Conectar a la base de datos
    await sql.connect(config);

    // Ejemplo de verificación de usuario en la tabla Usuarios
    const result = await sql.query`SELECT * FROM Usuarios WHERE Email = ${req.body.Email} AND Password = ${req.body.Password}`;

    // Cerrar la conexión
    await sql.close();

    if (result.recordset.length > 0) {
      // Obtén el UserID y el Username del usuario autenticado
      const userID = result.recordset[0].UserID;
      const username = result.recordset[0].Username;
      res.json({ message: 'Inicio de sesión exitoso.', userID, username });
    } else {
      res.status(401).json({ error: 'Credenciales incorrectas.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor.' });
  }
});

// ENDOPOINT  DE PUBLICACION GET
app.get('/posts', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`
      SELECT Publicaciones.*, Usuarios.Username 
      FROM Publicaciones 
      INNER JOIN Usuarios ON Publicaciones.UserID = Usuarios.UserID
    `;
    await sql.close();
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener publicaciones:', error);
    res.status(500).json({ error: 'Error en el servidor.' });
  }
});


// ENDOPOINT  DE PUBLICACION POST

app.post('/posts', async (req, res) => {
  try {
    await sql.connect(config);
    const { UserID, Contenido } = req.body;

    console.log('Recibiendo solicitud para crear una nueva publicación:');
    console.log('UserID:', UserID);
    console.log('Contenido:', Contenido);

    // Insertar la publicación sin el nombre de usuario
    const result = await sql.query`INSERT INTO Publicaciones (UserID, Contenido, FechaCreacion, Likes, Comentarios) 
                                    VALUES (${UserID}, ${Contenido}, GETDATE(), 0, 0)`;

    console.log('Publicación creada exitosamente.');
    res.json({ message: 'Publicación creada exitosamente.' });
  } catch (error) {
    console.error('Error al crear publicación:', error);
    res.status(500).json({ error: 'Error en el servidor.', details: error.message }); // Aquí cambiamos 'error' por 'error.message'
  } finally {
    try {
      // Siempre intentamos cerrar la conexión después de enviar la respuesta al cliente
      await sql.close();
    } catch (error) {
      console.error('Error al cerrar la conexión:', error);
    }
  }
});

// Endpoint para agregar un "Me gusta" a una publicación específica
app.post('/posts/:postID/like', async (req, res) => {
  try {
    const postID = req.params.postID;

    // Conectar a la base de datos
    await sql.connect(config);

    // Actualizar el número de "Me gusta" para la publicación específica
    const result = await sql.query`UPDATE Publicaciones SET Likes = Likes + 1 WHERE PostID = ${postID}`;

    // Cerrar la conexión
    await sql.close();

    res.json({ message: 'Se agregó un Me gusta a la publicación.' });
  } catch (error) {
    console.error('Error al agregar Me gusta:', error);
    res.status(500).json({ error: 'Error en el servidor.' });
  }
});

// Endpoint para agregar un comentario a una publicación específica
app.post('/posts/:postID/comment', async (req, res) => {
  try {
    const postID = req.params.postID;
    const { userID, contenido } = req.body;

    // Conectar a la base de datos
    await sql.connect(config);

    // Insertar el comentario en la tabla Comentarios
    const result = await sql.query`INSERT INTO Comentarios (PostID, UserID, Contenido, FechaComentario) 
                                   VALUES (${postID}, ${userID}, ${contenido}, GETDATE())`;

    // Actualizar el número de comentarios para la publicación específica
    await sql.query`UPDATE Publicaciones SET Comentarios = Comentarios + 1 WHERE PostID = ${postID}`;

    // Cerrar la conexión
    await sql.close();

    res.json({ message: 'Se agregó un comentario a la publicación.' });
  } catch (error) {
    console.error('Error al agregar comentario:', error);
    res.status(500).json({ error: 'Error en el servidor.' });
  }
});


// ENDOPOINT PARA OBTENER LA LISTA DE USUARIOS
app.get('/users', async (req, res) => {
  try {
    // Conectar a la base de datos
    await sql.connect(config);

    // Obtener la lista de usuarios
    const result = await sql.query`SELECT UserID, Username, Avatar FROM Usuarios`;

    // Cerrar la conexión
    await sql.close();

    // Enviar la lista de usuarios
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener la lista de usuarios:', error);
    res.status(500).json({ error: 'Error en el servidor.' });
  }
});


// ENDOPOINT  DE PERFIL GET
app.get('/user/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;

    // Conectar a la base de datos
    await sql.connect(config);

    // Obtener detalles del usuario por UserID
    const userResult = await sql.query`SELECT * FROM Usuarios WHERE UserID = ${userID}`;
    console.log('Resultado de la consulta SQL:', userResult); // Agrega esta línea para imprimir el resultado de la consulta SQL

    // Cerrar la conexión
    await sql.close();

    if (userResult.recordset.length > 0) {
      // Enviar los detalles del usuario
      res.json(userResult.recordset[0]);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado.' });
    }
  } catch (error) {
    console.error('Error al obtener detalles del usuario:', error);
    res.status(500).json({ error: 'Error en el servidor.' });
  }
});

// ENDPOINT PARA ACTUALIZAR UN USUARIO
app.put('/user/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;
    const { Username, Password, Email, Nombre, Apellido } = req.body;

    // Conectar a la base de datos
    await sql.connect(config);

    // Verificar si el usuario existe
    const checkUser = await sql.query`SELECT * FROM Usuarios WHERE UserID = ${userID}`;
    if (checkUser.recordset.length === 0) {
      // El usuario no existe
      res.status(404).json({ error: 'Usuario no encontrado.' });
      return;
    }

    // Actualizar el usuario en la base de datos
    await sql.query`UPDATE Usuarios SET Username = ${Username}, Password = ${Password}, Email = ${Email}, Nombre = ${Nombre}, Apellido = ${Apellido} WHERE UserID = ${userID}`;

    // Cerrar la conexión
    await sql.close();

    res.json({ message: 'Usuario actualizado exitosamente.' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error en el servidor.' });
  }
});

// ENDPOINT PARA AGREGAR UN AMIGO
app.post('/addfriend', async (req, res) => {
  try {
    const { userID, friendID } = req.body;

    // Conectar a la base de datos
    await sql.connect(config);

    // Verificar si ya son amigos
    const checkFriendship = await sql.query`SELECT * FROM Amigos WHERE UserID = ${userID} AND FriendID = ${friendID}`;
    if (checkFriendship.recordset.length > 0) {
      // Ya son amigos
      res.status(400).json({ error: 'Este usuario ya es tu amigo.' });
      return;
    }

    // Agregar la amistad
    await sql.query`INSERT INTO Amigos (UserID, FriendID) VALUES (${userID}, ${friendID})`;

    // Cerrar la conexión
    await sql.close();

    res.json({ message: 'Usuario agregado como amigo exitosamente.' });
  } catch (error) {
    console.error('Error al agregar amigo:', error);
    res.status(500).json({ error: 'Error en el servidor.' });
  }
});

// Endpoint para la carga de imágenes de perfil
app.post('/upload/avatar', upload.single('avatar'), (req, res) => {
  try {
    // Obtener la ruta de la imagen subida
    const imagePath = req.file.path;

    // Aquí debes implementar la lógica para guardar la imagen en el servidor
    // Por ejemplo, puedes mover la imagen a un directorio específico
    const destinationPath = 'path/to/destination/directory';
    fs.renameSync(imagePath, path.join(destinationPath, req.file.filename));

    res.json({ success: true, message: 'Imagen de perfil subida correctamente.' });
  } catch (error) {
    console.error('Error al subir la imagen de perfil:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor.' });
  }
});






app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});

