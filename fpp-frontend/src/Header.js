import React from 'react'
import './Header.css'
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import ForumIcon from '@material-ui/icons/Forum';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import {Link, useHistory } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const Header = ({backpath}) => {
    const history=useHistory();

    return (
        <div className="header">
            <IconButton>
                {backpath?(
                    <ArrowBackIosIcon onClick={()=>{history.replace(backpath)}}fontSize="large" className="header-icon" />
                ):
                (
                    <Link to="/profile">
                        <PersonIcon fontSize="large" className="header-icon" />
                    </Link>
                )}
            </IconButton>

            <Link to="/">
            <IconButton>
                <HomeRoundedIcon className="header-home" />
            </IconButton>
            </Link>

            <Link to="/chat">
            <IconButton>
                <ForumIcon fontSize="large" className="header-icon" />
            </IconButton>
            </Link>


        </div>
    )
}

export default Header
