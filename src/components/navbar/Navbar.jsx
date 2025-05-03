import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonIcon from "@mui/icons-material/Person";

// // import { useContext } from "react";

const Navbar = () => {
  // const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    console.log("btnh clicked");
    localStorage.clear();
    navigate("/");
  };

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return (
    <div className="navbar">
      <div className="navContainer">
        <div className="adminlogin">
          {/* <Link to="/adminhome" className="navButton"> */}
          <Link to="/adminlogin" className="navButton">
            Admin Login
          </Link>
          {/* </Link> */}
        </div>
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Hotel Booking App</span>
        </Link>

        {user ? (
          <div className="navItems">
            <p> {user.username}</p>
            <button type="button" name="logout" onClick={logout}>
              LogOut
            </button>
          </div>
        ) : (
          <div className="navItems">
            {/* <PersonIcon></PersonIcon> */}
            {/* <Link to="/reg" className="navButton">
              Register
            </Link>
            <Link to="/login" className="navButton">
              Login
            </Link> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
