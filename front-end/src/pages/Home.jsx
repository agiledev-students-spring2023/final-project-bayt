import React from 'react'

import '../css/Home.css'

import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom'

const Home = props => {
    return (
        <body>
            <Header />
            <main>
                <div className="livingRoom">
                <Link to="/tasks">Living Room</Link>
                </div>
            </main> 
            <Footer />
        </body>
    )
}

export default Home