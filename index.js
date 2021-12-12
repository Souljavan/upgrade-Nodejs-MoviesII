const express = require('express')
var server = express();
const PORT = 3000;

require('./db/db');


server.use(express.json())

server.use('/movies', require('./handlers/movies').router);
server.use('/cinemas', require('./handlers/cinemas').router);

server.use('*', (req, res, next) => {
  const error = new Error('Ruta no encontrada');
  error.status = 404;
  next(error);
});

server.use((err, req, res, next) => {
  console.error('[ERROR] Ha ocurrido un error', err.status, err.message);
return res.status(err.status || 500).json(err.message || 'Ha ocurrido un error en el servidor');
});


server.listen(PORT, () => {
    console.log(`Servidor arrancado en el puerto: ${PORT}`);
  });