import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="checkout" element={<div>Test checkout page</div>} />"
    </Routes>
    
  )
}

export default App
