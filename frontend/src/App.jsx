import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import AddCase from "./pages/AddCase"
import Start from "./pages/Start"
import NotFound from "./pages/NotFound"
import ProtectedRoute from './components/ProtectedRoute'

function Logout() {
  localStorage.clear()
  return <Navigate to="/start" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function LoginAndLogout() {
  localStorage.clear()
  return <Login />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute><Home /></ProtectedRoute>}
        ></Route>

        <Route
          path="/contact"
          element={<ProtectedRoute><Contact /></ProtectedRoute>}
        ></Route>

        <Route
          path="/addcase"
          element={<ProtectedRoute><AddCase /></ProtectedRoute>}
        ></Route>

        <Route
          path="/login"
          element={<LoginAndLogout />}
        ></Route>

        <Route
          path="/logout"
          element={<Logout />}
        ></Route>

        <Route
          path="/register"
          element={<RegisterAndLogout />}
        ></Route>

        <Route
          path="/start"
          element={<Start />}
        ></Route>  

        <Route
          path="*"
          element={<NotFound />}
        ></Route>       

      </Routes>
    </BrowserRouter>
  )
}

export default App;