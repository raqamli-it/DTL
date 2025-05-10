import React from 'react'
import Navbar from '../components/Navbar'
// import Home from '../Page/Home'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import { DataProvider } from '../config/DataContext'

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className='lg:min-h-[80vh]'>
        <DataProvider><Outlet /></DataProvider>

      </div>

      <Footer />
    </>
  )
}
