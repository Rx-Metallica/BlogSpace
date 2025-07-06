import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import Newsletter from '../components/NewsLetter'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <div>
        <Navbar/>
        <Header/>
        <BlogList/>
        <Newsletter/>
        <Footer/>
    </div>
  )
}

export default Home