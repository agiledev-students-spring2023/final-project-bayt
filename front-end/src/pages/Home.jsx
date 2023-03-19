import React from 'react'

import '../css/Home.css'

import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom'

const Home = props => {
    return (
        <div className="body">
            <Header />
            <main>
                <div className="bodyButtons">
                    <div className="row">
                        <div class="room">
                            <Link to="/tasks">
                                <button class="roomButton" type="button">
                                    Living Room
                                </button>
                            </Link>
                        </div>
                        <div class="room">
                            <Link to="/tasks">
                                <button class="roomButton" type="button">
                                    Bathroom
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                            <div className="addRoom">
                                <button class="roomButton" type="button">
                                    Add Room
                                </button>
                            </div>
                        </div>
                </div>
            </main> 
            <Footer />
        </div>
    )
}

export default Home