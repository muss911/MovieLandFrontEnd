import { useRef, useEffect, useState } from "react";
import { saveMovie, getMovie } from "../api/Movie";
import Movie from "../components/movie/Movie.tsx";
interface MovieObject {
  movieId: number;
  title: string;
  vote: number;
  cast: string;
  plot: string;
  director: string;
  photoUrl: string;
  active: boolean;
}

function Home() {
  const dialogRef = useRef<HTMLDialogElement>(null);
 const [values, setValues] = useState<MovieObject>({
  movieId:null,
  title: "",
  vote: 0,
  cast: "",
  plot: "",
  director: "",
  photoUrl: "",
  active: false,
});
  const [date, setData] = useState<MovieObject[]>([]);

  const getAllMovies = async (page = 10, size = 10) => {
    try {
      const response = await getMovie(page, size);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const toggleModal = (show: any) =>
    show ? dialogRef.current.showModal() : dialogRef.current.close();
  const handleNewMovie = async (event: any) => {
    event.preventDefault;
    try {
      const response = await saveMovie(values);
      console.log(response.data.id);
      setValues(response.data);
      //getAllMovies();
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values,  [event.target.name]: event.target.value });
  };
  useEffect(() => {
    getAllMovies();
  }, []);
  return (
    <>
      <div className="header">
        <div className="titleContainer">
          <h1 style={{ paddingLeft: "50px" }}>Benvenuti al cinema</h1>
          <h2 style={{ paddingLeft: "50px" }}>
            Ecco l'elenco di film disponibili
          </h2>
        </div>
        <div className="container">
          <button onClick={() => toggleModal(true)} className="btn">
            <i className="bi bi-plus-square"></i>
            Add New Movie
          </button>
        </div>
      </div>
      <div className="movieCard">
        <div
          className="movies"
          style={{ paddingLeft: "50px", paddingRight: "50px" }}
        >
          {date.map((movie) => (
            <div className="container__movie" key={movie.movieId}>
              <Movie movie={movie} />
            </div>
          ))}
        </div>
      </div>
      {/* Modal */}
      <dialog ref={dialogRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>New Movie</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={handleNewMovie}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Title</span>
                <input
                  type="text"
                  value={values.title}
                  onChange={onChange}
                  name="title"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Cast</span>
                <input
                  type="text"
                  value={values.cast}
                  onChange={onChange}
                  name="cast"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Plot</span>
                <input
                  type="text"
                  value={values.plot}
                  onChange={onChange}
                  name="plot"
                  required
                />
              </div>
              <div className="input-box">
                <span className="active">Active</span>
                <input
                  type="checkbox"
                  checked={values.active ?? false}
                  onChange={(e)=> setValues({...values,active:e.target.checked })} name="active"
                />
              </div>
            </div>
            <div className="form_footer">
              <button
                onClick={() => toggleModal(false)}
                type="button"
                className="btn btn-danger"
              >
                Cancel
              </button>
              <button type="submit" className="btn">
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default Home;
