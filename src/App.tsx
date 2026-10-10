import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Ticket from "./components/ticket/Ticket";
import Users from "./components/users/Users";
import MovieDetail from "./components/movie/MovieDetail";
import LoginAuth from "./components/authentication/LoginAuth";
/*interface MovieProps {
  movieId: number;
  title: string;
  vote: number;
  cast: string;
  plot: string;
  director: string;
  photoUrl: string;
  active: boolean;
}*/
function App() {
  
  /*const SelectedMovies = (movie:MovieProps) =>{
    try{
      console.log(movie)
      const response = saveMovie(movie)
      console.log("valore di response", response)
      return response

    }
    catch(error)
    {
      console.log(error);
    }
  }*/
  return (
    <>
      <Router>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<LoginAuth />} />
          <Route path="/movies/:movieId" element ={<MovieDetail />}/>
          <Route path="/acquista" element={<Ticket />} />
          <Route path="/profile/users" element={<Users />} />
          <Route path="*" element={<h1>Not Page fount</h1>} />
        </Routes>
        
      </Router>
      <div></div>
    </>
  );
}

export default App;
