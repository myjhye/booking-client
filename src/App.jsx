import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import AddRoom from './components/room/AddRoom'
import ExistingRooms from './components/room/ExistingRooms'
import Home from './components/home/Home'
import EditRoom from './components/room/EditRoom'

function App() {
  return (
    <>
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-room" element={<AddRoom />} />
          <Route path="/existing-rooms" element={<ExistingRooms />} />
          <Route path="/edit-room/:roomId" element={<EditRoom />} />
        </Routes>
      </Router>
    </main>
    </>
  )
}

export default App
