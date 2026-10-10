import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { getMovieById, updateMovie, deleteMovieById } from "../../api/Movie";
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
function MovieDetail() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [showForm, setShowForm] = useState<boolean>();
  const { movieId } = useParams(); // const movieId = useParams() mi restituisce l'oggetto
  //const [showConfirmForm,setShowConfirmForm] = useState<boolean>(false);
  console.log("il valore di movieId è", movieId);
  const id = parseInt(movieId);
  const [movie, setMovie] = useState<MovieObject>({
    movieId: id,
    title: "",
    vote: 0,
    cast: "",
    plot: "",
    director: "",
    photoUrl: "",
    active: true,
  });
  const toggleModal = (show: any) => {
    show ? dialogRef.current.showModal() : dialogRef.current.close();
  };
  const getMovie = async () => {
    try {
      const response = await getMovieById(movieId);
      //console.log(response)
      var id = parseInt(movieId);
      console.log("il valore di id è ", id);
      setMovie({
        ...movie,
        title: response.data.title,
        cast: response.data.cast,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setMovie({ ...movie, [event.target.name]: event.target.value });
    } catch (error) {
      console.log(error);
    }
  };
  const updateSelectedMovie = async (/*e: any*/) => {
    //e.preventDefault();//-> molto utile se voglio vedere se i dati sono stati inviati
    try {
      console.log("MOVIE INVIATO:", movie);
      const response = await updateMovie(movie);
      console.log(response);
      setMovie({
        ...movie,
        movieId: response.data.movieId,
        title: response.data.title,
        cast: response.data.cast,
        plot: response.data.plot,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteMovie = () => {
    setShowForm(true);
    //setShowConfirmForm(true)
    //const response = deleteMovieById(movieId);

    //console.log(response)
    //navigate("/")
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <>
      <div className="header">
        <h1>Dettagli del film </h1>
        <div className="container">
          <button className="btn" onClick={deleteMovie}>
            <i className="bi bi-dash-square"></i>
            Delete Movie
          </button>
          <Form
            title={movie.title}
            movieId={id}
            show={showForm}
            setShowForm={setShowForm}
          />
          <button onClick={() => toggleModal(true)} className="btn">
            <i className="bi bi-plus-square"></i>
            Update Movie
          </button>
        </div>
      </div>
      <div className="filmDetail">
        <div className="titleContainer">
          <h3>{movie.title}</h3>
        </div>
      </div>
      {/*Form per modificare il film */}
      <dialog ref={dialogRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>New Movie</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
        </div>

        <div className="modal__body">
          <form onSubmit={updateSelectedMovie}>
            <input defaultValue={movieId} name="id" required />
            <div className="user-details">
              <div className="input-box">
                <span className="details">Title</span>
                <input
                  type="text"
                  value={movie.title}
                  onChange={onChange}
                  name="title"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Cast</span>
                <input
                  type="text"
                  value={movie.cast}
                  onChange={onChange}
                  name="cast"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Plot</span>
                <input
                  type="text"
                  value={movie.plot}
                  onChange={onChange}
                  name="plot"
                  required
                />
              </div>
              <div className="input-box">
                <span className="active">Active</span>
                <input
                  type="checkbox"
                  checked={movie.active ?? false}
                  onChange={(e) =>
                    setMovie({ ...movie, active: e.target.checked })
                  }
                  name="active"
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
interface FormProp {
  title: string;
  movieId: number;
  show: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}
function Form({ title, movieId, show, setShowForm }: FormProp) {
  const [showConfirmForm, setShowConfirmForm] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const navigate = useNavigate(); // serve per navigare in un altra pagina
  console.log("valore di show è", show);

  const yesButton = async () => {
    const response = await deleteMovieById(movieId);

    console.log(response);

    setShowForm(false);
    setShowConfirmForm(true);
    setTimeout(() => {
      setShowConfirmForm(false);
      navigate("/");
    }, 3000);
  };
  const noButton = () => {
    setShowForm(false);
  };
  useEffect(() => {
    if (show) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [show]);
  return (
    <>
      <dialog ref={dialogRef} className="modal" id="modal">
        <div className="modal__header">
          <h2 style={{ color: "black" }}>
            Sei sicuro di voler cancellare il film?
          </h2>
          <i onClick={() => setShowForm(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="form_footer">
          <button className="btn" onClick={yesButton}>
            Yes
          </button>
          <button onClick={noButton} type="button" className="btn btn-danger">
            No
          </button>
        </div>
      </dialog>
      {/*dopo l'avvenuta cancellazione del film deve comparire questo*/}
      <ConfirmDelete title={title} showDialog={showConfirmForm} />
    </>
  );
}
function ConfirmDelete({
  title,
  showDialog,
}: {
  title: string;
  showDialog: boolean;
}) {
  //const navigate = useNavigate(); // serve per navigare in un altra pagina
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [progress, setProgress] = useState<number>(0);
  useEffect(() => {
    if (showDialog) {
      dialogRef.current?.showModal();
      const start = Date.now();
      const duration = 3000;
      const interval = setInterval(() => {
        const elapsed = Date.now() - start;
        const percentage = Math.min((elapsed / duration) * 100, 100);
        setProgress(percentage);
        if (percentage >= 100) {
          clearInterval(interval);
          dialogRef.current?.close();
        }
      }, 30);

      /*const timer = setTimeout(() => {
        dialogRef.current?.close();
      }, 3000);*/

      return () => clearInterval(interval);
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);
  return (
    <>
      <dialog ref={dialogRef} className="modal" id="modal">
        <div className="modal__header">
          <h2 style={{ color: "black" }}>
            Cancellazione del film con titolo {title} avvenuta con successo
          </h2>
        </div>
        <div
          style={{
            width: "100%",
            height: "10px",
            backgroundColor: "#ddd",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "green",
              transition: "width 0.03s linear",
            }}
          />
        </div>
      </dialog>
    </>
  );
}
export default MovieDetail;
