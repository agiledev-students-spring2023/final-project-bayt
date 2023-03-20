import React from 'react'

import '../css/Home.css'
import { Link } from 'react-router-dom'

const Home = props => {
    return (
        <div className="body">
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
                        <div className="room">
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
        </div>
    )
}

export default Home