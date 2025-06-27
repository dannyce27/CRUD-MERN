import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Clients from '../src/pages/clientsPage.jsx'
import Employees from '../src/pages/employees.jsx'
import Products from "../src/pages/productsPage.jsx"
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
      <Routes>
        <Route path="/clients" element={<Clients />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
