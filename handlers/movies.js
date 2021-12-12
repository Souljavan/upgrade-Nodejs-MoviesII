const express = require('express')
const router = express.Router()
const Movies = require('../model/movies');


router.get('/', (req, res,next) => {
    Movies.find()
        .then((movies) => {
            return res.json(movies);
        })
        .catch((error) => {
            const errorOcurrido = new Error();
            return next(errorOcurrido);
        })
});


router.get('/:id', (req, res ,next) => {
    const id = req.params.id;
    Movies.findById(id)
        .then(movies => {
            if (!movies) {
                return res.status(404).json('Pelicula no encontrado');
            }
            return res.json(movies)
        })
        .catch((error) => {
            const errorOcurrido = new Error();
            return next(errorOcurrido);
        })
});

router.get('/titulo/:title', (req, res,next) => {
    const title = req.params.name;
    Movies.find({ 'title': title })
        .then(movies => {
            if (!movies) {
                return res.status(404).json('Pelicula no encontrado');
            }
            return res.json(movies)
        })
        .catch((error) => {
            const errorOcurrido = new Error();
            return next(errorOcurrido);
        })
});

router.get('/genero/:genre', (req, res,next) => {
    const genre = req.params.genre;
    Movies.find({ 'genre': genre })
        .then(movies => {
            if (!movies) {
                return res.status(404).json('Pelicula no encontrado');
            }
            return res.json(movies)
        })
        .catch((error) => {
            const errorOcurrido = new Error();
            return next(errorOcurrido);
        })
});

router.get('/fecha/:ano', (req, res,next) => {
    const ano = req.params.ano;
    Movies.find().where({'year': { $gt: 2010 }})
        .then(movies => {
            if (!movies) {
                return res.status(404).json('Pelicula no encontrado');
            }
            return res.json(movies)
        })
        .catch((error) => {
            const errorOcurrido = new Error();
            return next(errorOcurrido);
        })
});

router.post('/', (req,res,next)=>{

    const newPelicula = new Movies({
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        genre:req.body.genre,
    });

    newPelicula.save()
        .then(() => {
            return res.status(201).json(newPelicula);
        }).catch((error) => {
            next(error);
        });

})

router.put('/:id', (req,res,next)=>{

    const movieid = req.params.id;
    const moviemodificar = new Movies(req.body);
    moviemodificar._id = movieid;
    Movies.findByIdAndUpdate(movieid, moviemodificar, { new: true })
        .then(movieactualizada => {
            res.status(200).json(movieactualizada);
        })
        .catch(error => {
            next(error);
        });

})

router.delete('/:id', (req, res, next) => {
    const movieid = req.params.id;
    Movies.findByIdAndDelete(movieid)
        .then(() => {
            return res.status(200).json(`Pelicula con id ${movieid} eliminado`);
        })
        .catch(error => {
            next(error);
        });
});





module.exports = {
    router: router
}