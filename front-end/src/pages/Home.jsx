import React from 'react'

import '../css/Home.css'

import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom'

const Home = props => {
    return (
        <div className="body">
            <Header title="Home"/>
            <main>
                <div className="bodyButtons">
                    <div className="row">
                        <div className="room">
                            <Link to="/room/livingRoom">
                                <button className="roomButton" type="button">
                                    Living Room
                                </button>
                            </Link>
                        </div>
                        <div className="room">
                            <Link to="/room/bathroom">
                                <button className="roomButton" type="button">
                                    Bathroom
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                            <Link to="/tasks/add">
                                <button className="roomButton" type="button">
                                    Add Room
                                </button>
                            </Link>
                        </div>
                </div>
            </main> 
            <Footer />
        </div>
    )
}

export default Home