import React, { useState,useEffect } from 'react';
import './Chats.css';
import Chat from './Chat';
import {useParams} from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import axios from './axios';

function Chats(){
    const id=localStorage.getItem("id");
    const {roomId}=useParams();

    const [message,setMessage] = useState([]);
    useEffect(() => {
        axios.get(`/chat/${id}`).then((res)=>{
            console.log(res.data);
            setMessage(res.data)
        })
    }, [])

    return (
        <div className="chats">

            <div className="chats_header">     
                <div className="chats_headercontainer">
                    <SearchIcon className="chats-search" />
                    <input type="text" placeholder="Search contact" />
                </div>
            </div>
            {message.map((person) => {
                return (
                    // <Link to='/profile'>
                    <Chat 
                    className="chats-info"
                    name={person.name}
                    image={person.profile}
                    id={person._id}
                    roomId={roomId}
                    />
                    // </Link>
                    
                )
            })
            }

        </div>
    )
}

export default Chats
