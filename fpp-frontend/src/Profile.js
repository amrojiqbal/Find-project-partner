import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import './Profile.css'
import { Avatar } from '@material-ui/core'
import axios from './axios'


const Profile = () => {
    const history = useHistory();

    const [user,setUser]=useState({});
    const id = localStorage.getItem('id');

    // const user=""
    useEffect(() => {

        axios.get(`/profile/${id}`).then((res)=>{
                const t=res.data;
                setUser(t);
                console.log(t);
                console.log('Profile useEffect');
                
            }).catch((error)=>{
                console.log('Error inside profile');
            })
    },[]);
    // const photo=require(`../../tinder-backend/uploads/${user.profile}`).default;

    console.log(user);
    const logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        history.push('/login');
    }
    return (
        <>
            {id ? (
                <div className="profile-body">
                    <div className="profile">
                        <div className="profile-dp">
                            <Avatar src={`${process.env.PUBLIC_URL}/uploads/${user.profile}`} alt={user.name} id="profile-avatar" />
                            {/* <img src={`${process.env.PUBLIC_URL}/uploads/${user.profile}`} alt="profile" /> */}

                        </div>
                        <div className="profile-details">
                            <div className="profile-name">
                                <h2>{user.name}</h2>
                                <p>{user.role}</p>
                            </div>
                            <div className="profile-about">
                                <h2>About</h2>
                            </div>
                            <div className="profile-personal">
                                <div className="profile-row">
                                    <div className="name">
                                        User Name
                                    </div>
                                    <div className="value">
                                        {user.username}
                                    </div>
                                </div>
                                <div className="profile-row">

                                    <div className="name">
                                        Name
                                    </div>
                                    <div className="value">
                                        {user.name}
                                    </div>
                                </div>
                                <div className="profile-row">
                                    <div className="name">
                                        Email
                                    </div>
                                    <div className="value">
                                        {user.email}
                                    </div>

                                </div>
                                <div className="profile-row">
                                    <div className="name">
                                        Profession
                                    </div>
                                    <div className="value">
                                        {user.role}
                                    </div>

                                </div>
                                <div className="profile-row">
                                    <div className="name">
                                        Skills
                                    </div>
                                    <div className="value">
                                        {user.skills}
                                    </div>

                                </div>
                                <div className="profile-row">
                                    <div className="name">
                                        Required Role
                                    </div>
                                    <div className="value">
                                        {user.required_role}
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="profile-update">
                            <Link to='/signup/create'>
                                <button className="edit-profile">Edit Profile</button>
                            </Link>
                            <button onClick={logout} className="logout">Log out</button>
                        </div>
                    </div>
                </div>

            ) : (
                history.push('/login')
            )
            }
        </>
    )
}

export default Profile
