import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import AddRoom from './components/room/AddRoom'
import ExistingRooms from './components/room/ExistingRooms'
import Home from './components/home/Home'

function App() {
  return (
    <>
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-room" element={<AddRoom />} />
          <Route path="/existing-rooms" element={<ExistingRooms />} />
        </Routes>
      </Router>
    </main>
    </>
  )
}

export default App
