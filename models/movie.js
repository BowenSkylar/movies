const db = require('../lib/dbConnect');

// Your middleware MUST allow limit and offset to be sent
// via query parameters to the db for filtering

// default limit
const limit = 10;
// default offset
const offset = 0;

function getAllMovies(req, res, next) {
if(!req.query.limit){
  req.query.limit = limit;
};
if (!req.query.offset){
  req.query.offset = offset ;
}
db.any(`SELECT * FROM movies LIMIT 10 OFFSET $1;` , [req.query.offset])
.then((movies) => {
  res.rows = movies;
  next();
})
  .catch(error => next(error));

}

function getMovie(req, res, next) {
// // implement get single movie
db.one(`SELECT * FROM movies WHERE id =${req.params.id};`)
.then((movie) => {
  res.rows = movie;
  next();
})
  .catch(error => next(error));
}


// // BONUS
function getAllMoviesWithRatings(req, res, next) {
if(!req.query.limit){
  req.query.limit = limit;
};
if (!req.query.offset){
  req.query.offset = offset ;
}
db.any(`SELECT movies.title, movies.release_date, ratings.rating
  FROM ratings
  INNER JOIN movies
    ON(movies.id = ratings.movie_id) LIMIT $1 OFFSET $2`, [req.query.limit, req.query.offset] )
.then((movies) => {
  res.rows = movies;
  next();
})
  .catch(error => next(error));
}

// function updateMovie(req, res, next) {
// // implement update
// }

// function deletemovie(req, res, next) {
// // implement delete
// }


module.exports = {
   getAllMovies,
   getMovie,
  // updateMovie,
  // deletemovie,
  getAllMoviesWithRatings
};
