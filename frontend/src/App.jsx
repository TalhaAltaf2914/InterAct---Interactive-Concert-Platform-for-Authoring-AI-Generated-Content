import { useState } from 'react'
import './App.css'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import { Home } from './pages/Home/Home'
import { Layout } from './components/Layout/Layout';

import { CssBaseline } from '@mui/material';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="about" element={<About />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
