import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import { BASE_URL } from "../../constants";

function Navbar() {
  const { status, userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/users/logout`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
    } catch (e) {
      console.log(e);
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow">
      <Link to="/" className="font-bold text-xl">MyTube</Link>
      {status ? (
        <div className="flex items-center gap-3">
          <span>{userData?.username}</span>
          <button onClick={handleLogout} className="bg-red-600 text-white rounded px-3 py-1">Logout</button>
        </div>
      ) : (
        <Link to="/login" className="bg-blue-600 text-white rounded px-3 py-1">Login</Link>
      )}
    </nav>
  );
}

export default Navbar;