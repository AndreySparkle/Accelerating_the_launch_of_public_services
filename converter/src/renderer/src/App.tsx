import { Route, Routes } from 'react-router-dom'
import Main from './pages/main/Main'
import Create from './pages/create/Create'
import Header from './Components/layout/Header/Header'
import React from 'react';

const App:React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/create" element={<Create/>} />
      </Routes>
    </>
  )
}

export default App
