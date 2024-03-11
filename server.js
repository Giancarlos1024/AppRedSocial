// server.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routers/authRoutes');
const userRoutes = require('./src/routers/userRoutes');
const postRoutes = require('./src/routers/postRoutes');
const config = require('./src/config/dbConfig'); // Importa la configuración de la base de datos
const messageRoutes = require('./src/routers/messageRoutes');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Configura la conexión a la base de datos
const sql = require('mssql');
sql.connect(config)
  .then(() => console.log('Conexión establecida con la base de datos'))
  .catch(err => console.error('Error al conectar con la base de datos:', err));

// Multer disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Directorio donde se guardarán las imágenes de perfil
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // Renombrar la imagen con un nombre único
  }
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors());

// Rutas
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/messages', messageRoutes);



app.get('/', (req, res) => {
  res.send('¡Bienvenido a la aplicación móvil de red social!');
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
