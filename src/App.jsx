import {BrowserRouter, Routes, Route} from 'react-router-dom'
import PopularMovies from './component/PopularMovies'
import './index.css'
import Detail from './component/Detail'
import Login from './component/Login'
import Register from './component/Register'
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PopularMovies/>}>
        </Route>
        <Route path='/Detail/:id' element={<Detail/>}>
        </Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
