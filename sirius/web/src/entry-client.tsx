
import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './styles/index.scss'
import './components/controls'
import { HomeClientPage } from './client/pages/home'
import RandomPasswordPage from './client/pages/random-password'


const App = () => {
  return <Router>
    <Routes>
      <Route path="/utils/random/password" element={<RandomPasswordPage/>}/> 
      <Route path="/" element={<HomeClientPage />} />
    </Routes>
  </Router>
}

const rootElement = document.getElementById('root')
if (rootElement) {
  createRoot(rootElement).render(<App />)
}