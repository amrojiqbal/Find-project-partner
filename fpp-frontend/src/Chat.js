import React from 'react'
import './Chat.css'
import { Avatar } from '@material-ui/core'
import {Link} from 'react-router-dom'

const Chat = ({name,image,id,roomId}) => {

    return (
        <Link to={`/chat/${id}`}>
            <div className={`chat ${id===roomId && "chat_curr"}`}>
                <Avatar alt={name} src={`${process.env.PUBLIC_URL}/uploads/${image}`} />
                <div className="chat_details">
                    <h2>
                        {name}
                    </h2>
                </div>
            </div>
        </Link>
    )
}

export default Chat
