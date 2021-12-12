const mongoose=require('mongoose');
const Schema = mongoose.Schema;

// Creamos el esquema de personajes
const CinemasSchema = new Schema(
    {
      name: { type: String, required: true },
      location: { type: String, required: true },
      movies: [{ type: mongoose.Types.ObjectId, ref: 'movies' }]
    },
    {
      timestamps: true,
    }
  );
  
  // Creamos y exportamos el modelo Movies
  const Cinemas = mongoose.model('cinemas', CinemasSchema);
  module.exports = Cinemas;