import { Link } from "react-router";

interface Movie {
  movieId: number;
  title: string;
  vote: number;
  cast: string;
  plot: string;
  director: string;
  photoUrl: string;
  active: boolean;
}

interface MovieProps {
  movie: Movie;
}
function Movie ({movie }:MovieProps)
{

        return (
            <>
          
            <Link to={`/movies/${movie.movieId}`} className="movie__item">
            <div className="movie__header">
                <div className="movie__details">
                    <p className="movie__title">{movie.title}</p>
                    <p className="movie__plot">{movie.plot}</p>
                </div>
            </div>
            </Link>
        </>
        )
}
export default Movie