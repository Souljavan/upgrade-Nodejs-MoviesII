const express = require('express')
const router = express.Router()
const Cinemas = require('../model/cinema');


router.get('/', (req, res,next) => {
    Cinemas.find()
        .then((cinema) => {
            return res.json(cinema);
        })
        .catch((error) => {
            next(error)
        })
});


router.get('/:id', (req, res ,next) => {
    const id = req.params.id;
    Cinemas.findById(id)
        .then(cinema => {
            if (!cinema) {
                return res.status(404).json('Pelicula no encontrado');
            }
            return res.json(cinema)
        })
        .catch((error) => {
            next(error)
        })
});

router.get('/:id/:empleados', (req, res,next) => {
    const cinemaid = req.params.id;
    Cinemas.findById(empresaId).populate('movies')
        .then(cinema => {
            if (!cinema) {
                return res.status(404).json('Pelicula no encontrado');
            }
            return res.json(cinema)
        })
        .catch((error) => {
            next(error)
        })
});


router.post('/', (req,res,next)=>{

    const newcinema = new Cinemas({
        name: req.body.name,
        location: req.body.location,
        movies: req.body.movies || [],
    });

    newcinema.save()
        .then(() => {
            return res.status(201).json(newcinema);
        }).catch((error) => {
            next(error);
        });

})

router.put('/:id', (req,res,next)=>{

    const cinemaid = req.params.id;
    const cinemamodificar = new Cinemas(req.body);
    cinemamodificar._id = cinemaid;
    Cinemas.findByIdAndUpdate(cinemaid, cinemamodificar, { new: true })
        .then(cineactualizada => {
            res.status(200).json(cineactualizada);
        })
        .catch(error => {
            next(error);
        });

})

router.put('/:id/movies', (req,res,next)=>{

    const cinemaid = req.params.id;
    const movieid = req.body.movieaanadir;

    Cinemas.findByIdAndUpdate(
        cinemaid,
        { $push: { movies: movieid } },
        { new: true }
    )
        .then(cineactualizado => {
            res.status(200).json(cineactualizado)
        })
        .catch(error => {
            next(error);
        });

})

router.delete('/:id', (req, res, next) => {
    const cinemaid = req.params.id;
    Cinemas.findByIdAndDelete(cinemaid)
        .then(() => {
            return res.status(200).json(`Cine con id ${cinemaid} eliminado`);
        })
        .catch(error => {
            next(error);
        });
});





module.exports = {
    router: router
}