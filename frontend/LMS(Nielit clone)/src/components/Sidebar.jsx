import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-dark-subtle vh-100 p-3" style={{ width: "250px" }}>
      <h4 className="mb-4 fw-bold ">NIELIT</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link
            className="nav-link active fw-bold text-success"
            to="/dashboard"
          >
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link fw-bold text-success" to="/profile">
            My Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link fw-bold text-success" to="/Enrollcourses">
            Enrolled Courses
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link fw-bold text-success" to="/wishlist">
            Wishlist
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link fw-bold text-success" to="/settings">
            Settings
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link fw-bold text-danger" to="/logout">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
