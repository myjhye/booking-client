import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import AddRoom from './components/room/AddRoom'
import ExistingRooms from './components/room/ExistingRooms'
import Home from './components/home/Home'
import EditRoom from './components/room/EditRoom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import RoomListing from './components/room/RoomListing'
import Admin from './components/admin/Admin'
import Checkout from './components/booking/Checkout'
import BookingSuccess from './components/booking/BookingSuccess'
import Bookings from './components/booking/Bookings'
import FindBooking from './components/booking/FindBooking'
import RoomSearch from './components/common/RoomSearch'
import Login from './components/auth/Login'
import { AuthProvider } from './components/auth/AuthProvider'
import Registration from './components/auth/Registration'
import Profile from './components/auth/Profile'
import { ProtectedRoute } from './components/routes/ProtectedRoute'
import { AdminRoute } from './components/routes/AdminRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-16">
          <Routes>
            {/* 공개 라우트 - 로그인 불필요 */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/browse-all-rooms" element={<RoomListing />} />
            <Route path="/search-room" element={<RoomSearch />} />
            <Route path="/find-booking" element={<FindBooking />} />

            {/* 로그인 필요한 라우트 */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/book-room/:roomId" 
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/booking-success" 
              element={
                <ProtectedRoute>
                  <BookingSuccess />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/existing-bookings" 
              element={
                <ProtectedRoute>
                  <Bookings />
                </ProtectedRoute>
              } 
            />

            {/* 관리자 전용 라우트 */}
            <Route 
              path="/admin" 
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              } 
            />
            <Route 
              path="/add-room" 
              element={
                <AdminRoute>
                  <AddRoom />
                </AdminRoute>
              } 
            />
            <Route 
              path="/edit-room/:roomId" 
              element={
                <AdminRoute>
                  <EditRoom />
                </AdminRoute>
              } 
            />
            <Route 
              path="/existing-rooms" 
              element={
                  <AdminRoute>
                    <ExistingRooms />
                  </AdminRoute>
              } 
            />
          </Routes>
          <Footer />
        </main>
      </Router>
    </AuthProvider>
  )
}

export default App