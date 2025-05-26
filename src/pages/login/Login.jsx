import { useContext, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../utils/instance";
import { Link } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axiosInstance.post("/auth/login", credentials);
      console.log(res.data);
      dispatch({ type: "LOGIN_SUCCESS ", payload: res.data.details });
      localStorage.setItem("access_token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.details));
      console.log(res.data.details);
      // localStorage.setItem("username", JSON.stringify(res.data.username));
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.message });
      window.alert(err.response.data.message);
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <h1>User Login</h1>
        <input
          type="text"
          placeholder="username"
          id="username"
          className="lInput"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="lInput"
          onChange={handleChange}
        />
        <button disabled={loading} onClick={handleClick} className="lbutton">
          Login
        </button>
        <Link to="/reg ">Go to Register</Link>

        {error && <span>alert{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
