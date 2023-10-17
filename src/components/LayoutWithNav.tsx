import React from 'react'
import { Navbar } from './Navbar'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

function LayoutWithNav() {
  return (
    <>
      <Toaster />
      <Navbar />
      <Outlet />
    </>
  )
}

export default LayoutWithNav
