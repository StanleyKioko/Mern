import './App.css'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { CreateBlog } from './pages/CreateBlog'
import { Home } from './pages/Home'
import { Landing } from './pages/Landing'
import { Profile } from './pages/Profile'
import { ReadBlog } from './pages/ReadBlog'
import { Layout } from './components/Layout'
import { Navbar } from './components/Navbar'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Navbar /><Landing /></>} />
        {/* Change this from path="/" to element={<Layout />} without a path */}
        <Route element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="createblog" element={<CreateBlog />} />
          <Route path="readblog/:id" element={<ReadBlog />} />
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App