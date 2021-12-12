const mongoose = require('mongoose');
const Movies = require('../model/movies');
const dbConnection = require('../db/db');


const movies = [
  {
    title: 'The Matrix',
    director: 'Hermanas Wachowski',
    year: 1999,
    genre: 'Acción',
  },
  {
    title: 'The Matrix Reloaded',
    director: 'Hermanas Wachowski',
    year: 2003,
    genre: 'Acción',
  },
  {
    title: 'Buscando a Nemo',
    director: 'Andrew Stanton',
    year: 2003,
    genre: 'Animación',
  },
  {
    title: 'Buscando a Dory',
    director: 'Andrew Stanton',
    year: 2016,
    genre: 'Animación',
  },
  {
    title: 'Interestelar',
    director: 'Christopher Nolan',
    year: 2014,
    genre: 'Ciencia ficción',
  },
  {
    title: '50 primeras citas',
    director: 'Peter Segal',
    year: 2004,
    genre: 'Comedia romántica',
  },
];

const MoviesDocuments = movies.map(movies => new Movies(movies));

dbConnection
    .then(async() =>{
        const allMovies = await Movies.find();
        if (allMovies.length > 0) {
            await Movies.collection.drop();
        }
      })
    .catch((error) => console.error('Error eliminando colección Usuarios:', error))
    .then(async () => {
        await Movies.insertMany(MoviesDocuments)
    })
    .catch((error) => console.error('Error al insertar en Usuario:', error))
    .finally(() => {
      console.log("Las peliculas fueron insertadas correctamente")
      mongoose.disconnect()
    });
