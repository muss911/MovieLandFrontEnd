import { Link } from "react-router"

function Navbar()
{
    return (
        <div className="navbar">
            <div className="navBarTitle">
                <h1 style={{fontSize: "30px", color:"white",paddingLeft:"10px" }}>Welcome to Movie Land</h1>
            </div>
            <div className="selected">
                <Link to="/" className="link">Home</Link>
                <Link to="menu" className="link">Menu</Link>
                <Link to="/movies" className="link">Movie</Link>
            </div>
        </div>
    )
}
export default Navbar