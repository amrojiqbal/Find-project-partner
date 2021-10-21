import React from 'react'
import './HeaderLogin.css'
import image from './image/logo.png'

const Header_login = () => {
    return (
        <div className="header_login">
            <div className="header_content">
                <img src={image} alt="Logo" />
                <p>Find your project partner easily and efficiently</p>
            </div>
            
        </div>
    )
}

export default Header_login
