import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { Button } from './components/Button'
import { Header } from './components/Header'
import { InputBox } from './components/InputBox'
import { Subheading } from './components/Subheading'
import { Signup } from './pages/Signup'
import { Suspense } from 'react'
import { Signin } from './pages/Signin'
import { Appbar } from './components/Appbar'
import { Balance } from './components/Balance'
import { Users } from './components/Users'
import { Dashboard } from './pages/Dashboard'
import { Send } from './pages/Send'

function App() {

  return (
   <BrowserRouter>
   <Routes>
   <Route path='/signup' element={<Suspense fallback={"...loading"}> <Signup/> </Suspense>}></Route>
 <Route path='/signin' element={<Suspense fallback={"...loading"}> <Signin/> </Suspense>}></Route>
 <Route path='/dashboard' element={<Suspense fallback={"...loading"}> <Dashboard/> </Suspense>}></Route>
 <Route path='/send' element={<Suspense fallback={"...loading"}> <Send/> </Suspense>}></Route>
 

   </Routes>
   </BrowserRouter>

     
    
  )

}

export default App
