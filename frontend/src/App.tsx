import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'
import { FC } from 'react'

import { History, Home } from './pages'
import { Navbar } from './components'

import './App.css'

export const App:FC = () => (
  <div className="App">
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/history"
          element={<History />}
        />
      </Routes>
    </Router>
  </div>
)
