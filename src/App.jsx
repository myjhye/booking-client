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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="/book-room/:roomId" element={<Checkout />} />
            <Route path="/existing-rooms" element={<ExistingRooms />} />
            <Route path="/edit-room/:roomId" element={<EditRoom />} />
            <Route path="/browse-all-rooms" element={<RoomListing />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/existing-bookings" element={<Bookings />} />
            <Route path="/find-booking" element={<FindBooking />} />
            <Route path="/search-room" element={<RoomSearch />} />
          </Routes>
          <Footer />
        </main>
      </Router>
    </AuthProvider>
  )
}

export default App
