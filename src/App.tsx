import { useState } from 'react'
import {BrowserRouter, Routes, Route, Navigate, useNavigate} from 'react-router-dom';

import TicTacToeLayout from '@/layout/TicTacToeLayout';


import '@/styles/components.css'
 


function AppRoutes() {
  return (
    <Routes> 
      {/* TODO */}
    </Routes>
  )
}


function App() {
  const [count, setCount] = useState(0)

  // temp layout usage
  return (
     <TicTacToeLayout>
      <h1 className="text-4xl font-extrabold tracking-tight">Karsoogh V2</h1>
      <p className="mt-4 max-w-xl text-white/70">
        This is your content layer. Background symbols float behind it.
      </p>
    </TicTacToeLayout>
  )

}

export default App
