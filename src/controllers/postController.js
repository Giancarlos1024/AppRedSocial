const sql = require('mssql');
const config = require('../config/dbConfig');

exports.getPosts = async (req, res) => {
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
};

exports.createPost = async (req, res) => {
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
    res.status(500).json({ error: 'Error en el servidor.', details: error.message });
  } finally {
    try {
      await sql.close();
    } catch (error) {
      console.error('Error al cerrar la conexión:', error);
    }
  }
};

exports.likePost = async (req, res) => {
  try {
    const postID = req.params.postID;

    await sql.connect(config);

    const result = await sql.query`UPDATE Publicaciones SET Likes = Likes + 1 WHERE PostID = ${postID}`;

    await sql.close();

    res.json({ message: 'Se agregó un Me gusta a la publicación.' });
  } catch (error) {
    console.error('Error al agregar Me gusta:', error);
    res.status(500).json({ error: 'Error en el servidor.' });
  }
};

exports.commentPost = async (req, res) => {
  try {
    const postID = req.params.postID;
    const { userID, contenido } = req.body;

    await sql.connect(config);

    const result = await sql.query`INSERT INTO Comentarios (PostID, UserID, Contenido, FechaComentario) 
                                   VALUES (${postID}, ${userID}, ${contenido}, GETDATE())`;

    await sql.query`UPDATE Publicaciones SET Comentarios = Comentarios + 1 WHERE PostID = ${postID}`;

    await sql.close();

    res.json({ message: 'Se agregó un comentario a la publicación.' });
  } catch (error) {
    console.error('Error al agregar comentario:', error);
    res.status(500).json({ error: 'Error en el servidor.' });
  }
};
