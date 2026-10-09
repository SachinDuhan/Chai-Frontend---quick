// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
import './App.css'
import Navbar from './components/Header/Navbar'
import Home from './components/Home/Home'
import {Outlet} from 'react-router-dom'
import Sidebar from './components/Home/Sidebar'

function App() {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default App
