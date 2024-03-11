//userController.js

const sql = require('mssql');
const config = require('../config/dbConfig');

exports.getUsers = async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT UserID, Username, Avatar FROM Usuarios`;
    await sql.close();
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener la lista de usuarios:', error);
    res.status(500).json({ error: 'Error en el servidor.' });
  }
};


exports.getUser = async (req, res) => {
  try {
    const userID = req.params.userID;

    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Usuarios WHERE UserID = ${userID}`;
    await sql.close();

    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado.' });
    }
  } catch (error) {
    console.error('Error al obtener detalles del usuario:', error);
    res.status(500).json({ error: 'Error en el servidor.' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userID = req.params.userID;
    const { Username, Password, Email, Nombre, Apellido } = req.body;

    await sql.connect(config);

    const checkUser = await sql.query`SELECT * FROM Usuarios WHERE UserID = ${userID}`;
    if (checkUser.recordset.length === 0) {
      res.status(404).json({ error: 'Usuario no encontrado.' });
      return;
    }

    await sql.query`UPDATE Usuarios SET Username = ${Username}, Password = ${Password}, Email = ${Email}, Nombre = ${Nombre}, Apellido = ${Apellido} WHERE UserID = ${userID}`;

    await sql.close();

    res.json({ message: 'Usuario actualizado exitosamente.' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error en el servidor.' });
  }
};

exports.addFriend = async (req, res) => {
  const { userID, friendID } = req.body;
  
  try {
    const pool = await sql.connect(config);
    
    await pool.request()
      .input('userID', sql.Int, userID)
      .input('friendID', sql.Int, friendID)
      .query('INSERT INTO Amigos (UsuarioID1, UsuarioID2, FechaAmistad) VALUES (@userID, @friendID, GETDATE())');
    
    res.json({ success: true, message: 'Amigo agregado correctamente.' });
  } catch (error) {
    console.error('Error al agregar amigo:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor.' });
  }
};