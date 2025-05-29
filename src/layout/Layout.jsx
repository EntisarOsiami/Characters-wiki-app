import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Layout() {
  return (
    <div className='min-h-screen flex flex-col bg-gray-200'>
        <Navbar />
        <main className='flex-grow flex justify-center'>
            <Outlet />
        </main>
        <Footer />

    </div>
  )
}

export default Layout