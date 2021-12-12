const mongoose=require('mongoose');
const Schema = mongoose.Schema;

// Creamos el esquema de personajes
const MoviesSchema = new Schema(
    {
      title: { type: String, required: true },
      director: { type: String },
      year: { type: Number},
      genre: { type: String }
    },
    {
      timestamps: true,
    }
  );
  
  // Creamos y exportamos el modelo Movies
  const Movies = mongoose.model('movies', MoviesSchema);
  module.exports = Movies;