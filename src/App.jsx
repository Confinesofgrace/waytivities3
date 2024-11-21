import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './Pages/Landing Page/LandingPage'
import About from './Pages/About/About'
import Books from './Pages/Books/Books'
import SignUp from './Pages/SignUp/SignUp'
import LogIn from './Pages/LogIn/LogIn'
import Navbar from './Components/Navbar'
import Admin from './Pages/Admin/Admin'

function App() {

  return (

    <BrowserRouter>

      
    
      <main>
        <Navbar/>

        <Routes>
          <Route path='/'  element={<LandingPage/> }  />
          <Route path='/about'  element={<About/> }  />
          <Route path='/books'  element={<Books/>}  />
          <Route path='/admin'  element={<Admin/>}  />
          <Route path='/signup'  element={<SignUp/> }  />
          <Route path='/login'  element={<LogIn/> }  />
        </Routes>
        
      </main>
      
    </BrowserRouter>
      
  )
}

export default App
