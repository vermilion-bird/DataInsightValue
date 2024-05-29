"use client"
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/head'
const inter = Inter({ subsets: ['latin'] })
import { ClerkProvider } from '@clerk/nextjs'
import Sidebar from '@/components/layout/sidebar'
import React, { useState } from 'react';
import { LucideChevronLeft, LucideChevronRight } from 'lucide-react';
import { Provider } from 'react-redux'
import store from '@/redux/store'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);

  const toggleLeftPanel = () => {
    setIsLeftPanelOpen(!isLeftPanelOpen);
  };
  return (
    // <ClerkProvider>
    <Provider store={store}>

    <html lang="en">
      <body className={inter.className}>
        <Header></Header>
        <div className="border-t border-gray-300 py-1"></div>
        <div className='flex'>
          {/* <div className="w-2/8"> */}
          {/* Sidebar content */}
          {isLeftPanelOpen && (
            <div><Sidebar></Sidebar> </div>)}
          <div onClick={toggleLeftPanel} className="w-12 h-12 flex justify-center items-center border-2 rounded-full bg-gray-100 cursor-pointer">
            {isLeftPanelOpen ? <LucideChevronLeft /> : <LucideChevronRight />}</div>

          {/* </div> */}
          {/* <div className="w-6/8"> */}
          {/* Main content */}
          <div className='border-2  w-screen mr-1'>
          {children}
          </div>
        </div>
        {/* </div> */}
      </body>
    </html>
    </Provider>
    //  </ClerkProvider> 
  )
}
