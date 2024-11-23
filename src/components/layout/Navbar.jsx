import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-800 text-gray-200 shadow-md">
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
                  모든 객실 조회하기
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
                  to="/profile"
                  className="text-sm font-medium hover:text-white"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/logout"
                  className="text-sm font-medium hover:text-white"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}