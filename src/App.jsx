import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AdminHome from "./pages/adminhome/Home";
import AdminList from "./pages/adminlist/List";
import AdminLogin from "./pages/adminlogin/Login";
import AdminNew from "./pages/adminnewuser/New";
import AdminSingle from "./pages/adminsingleuser/Single";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import { userInputs } from "./formSource";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import { AuthContext } from "./context/AuthContext";
// import { useContext } from "react";

function App() {
  const ProtectedRoute = ({ children }) => {
    //const { user } = useContext(AuthContext);
    const token = localStorage.getItem("token");
    if (!token) {
      return <Navigate to="/AdminLogin" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/hotelslist" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reg" element={<Register inputs={userInputs} />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/adminlogin" element={<AdminLogin />} />

        <Route path="users">
          <Route
            index
            element={
              <ProtectedRoute>
                <AdminList columns={userColumns} />
              </ProtectedRoute>
            }
          />
          <Route
            path=":userId"
            element={
              <ProtectedRoute>
                <AdminSingle />
              </ProtectedRoute>
            }
          />
          <Route
            path="new"
            element={
              <ProtectedRoute>
                <AdminNew inputs={userInputs} title="Add New User" />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="hotels">
          <Route
            index
            element={
              <ProtectedRoute>
                <AdminList columns={hotelColumns} />
              </ProtectedRoute>
            }
          />
          <Route
            path=":productId"
            element={
              <ProtectedRoute>
                <AdminSingle />
              </ProtectedRoute>
            }
          />
          <Route
            path="new"
            element={
              <ProtectedRoute>
                <NewHotel />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="rooms">
          <Route
            index
            element={
              <ProtectedRoute>
                <AdminList columns={roomColumns} />
              </ProtectedRoute>
            }
          />
          <Route
            path=":productId"
            element={
              <ProtectedRoute>
                <AdminSingle />
              </ProtectedRoute>
            }
          />
          <Route
            path="new"
            element={
              <ProtectedRoute>
                <NewRoom />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
