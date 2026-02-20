import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './lib/theme'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import Units from './pages/Units.tsx'
import Events from './pages/Events.tsx'
import News from './pages/News.tsx'
import Contact from './pages/Contact.tsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}> 
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="units" element={<Units />} />
            <Route path="events" element={<Events />} />
            <Route path="news" element={<News />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
