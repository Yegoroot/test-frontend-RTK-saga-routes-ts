import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'
import { FC } from 'react'

import { HistoryPage, HomePage } from './pages'
import { Navbar } from './components'

import './App.css'

export const App:FC = () => (
  <div className="App">
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/history"
          element={<HistoryPage />}
        />
      </Routes>
    </Router>
  </div>
)
