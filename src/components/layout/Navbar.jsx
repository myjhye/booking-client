import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Navbar() {

  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    handleLogout();
    navigate("/", { 
      state: { 
        message: "You have been logged out!" 
      } 
    });
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-800 text-gray-200 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-xl font-bold text-blue-400">
              Hotel Booking Site
            </Link>

            <ul className="flex items-center space-x-6">
              <li>
                <NavLink
                  to="/browse-all-rooms"
                  className={({ isActive }) =>
                    `text-sm font-medium ${
                      isActive ? "text-blue-400" : "hover:text-white"
                    }`
                  }
                >
                  전체 객실
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/search-room"
                  className={({ isActive }) =>
                    `text-sm font-medium ${
                      isActive ? "text-blue-400" : "hover:text-white"
                    }`
                  }
                >
                  객실 검색
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `text-sm font-medium ${
                      isActive ? "text-blue-400" : "hover:text-white"
                    }`
                  }
                >
                  어드민 페이지
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/find-booking"
                  className={({ isActive }) =>
                    `text-sm font-medium ${
                      isActive ? "text-blue-400" : "hover:text-white"
                    }`
                  }
                >
                  내 예약 확인하기
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="hidden lg:flex space-x-8">
            <ul className="flex items-center space-x-6">
              {user ? (
                <>
                  <li>
                    <Link
                      to="/profile"
                      className="text-sm font-medium text-blue-400"
                    >
                      {user.sub}
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={onLogout}
                      className="text-sm font-medium hover:text-white"
                    >
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="text-sm font-medium hover:text-white"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="text-sm font-medium text-blue-400"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}