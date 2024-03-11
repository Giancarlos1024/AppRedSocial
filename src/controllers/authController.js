const sql = require('mssql');
const config = require('../config/dbConfig');

exports.signup = async (req, res) => {
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

    // Ejemplo de inserción de usuario en la tabla Usuarios
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
};

exports.signin = async (req, res) => {
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
};
