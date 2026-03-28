import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'

export default function App(){
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={isHome ? 'flex-1' : 'flex-1 container mx-auto p-4'}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
