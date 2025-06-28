import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return ( 
    <div className='relative w-full min-h-screen'>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
        </Routes>
      </Router>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#0b666a',
            color: '#fff',
          },
        }}
      />
    </div>
  )
}

export default App