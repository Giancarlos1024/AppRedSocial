const sql = require('mssql');
const config = require('../config/dbConfig');

exports.getMessages = async (req, res) => {
  const { userID, friendID } = req.params;
  
  try {
    const pool = await sql.connect(config);
    
    const result = await pool.request()
        .input('userID', sql.Int, userID)
        .input('friendID', sql.Int, friendID)
        .query(`
            SELECT * 
            FROM MensajesPrivados 
            WHERE (EmisorID = @userID AND ReceptorID = @friendID) 
            OR (EmisorID = @friendID AND ReceptorID = @userID)
            ORDER BY FechaEnvio ASC
        `);

    
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener historial de mensajes:', error);
    res.status(500).json({ error: 'Error en el servidor.' });
  }
};

exports.sendMessage = async (req, res) => {
  const { senderID, receiverID, content } = req.body;
  
  try {
    const pool = await sql.connect(config);
    
    await pool.request()
      .input('senderID', sql.Int, senderID)
      .input('receiverID', sql.Int, receiverID)
      .input('content', sql.NVarChar, content)
      .query(`
        INSERT INTO MensajesPrivados (EmisorID, ReceptorID, Contenido, FechaEnvio) 
        VALUES (@senderID, @receiverID, @content, GETDATE())
      `);
    
    res.json({ success: true, message: 'Mensaje enviado correctamente.' });
  } catch (error) {
    console.error('Error al enviar mensaje:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor.' });
  }
};
