import React, { useState, useEffect, useRef } from 'react'
import { Avatar } from '@material-ui/core'
import './Chatscreen.css'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import SendIcon from '@material-ui/icons/Send';
import axios from './axios';
import validator from 'validator';
import { useParams } from 'react-router-dom';

const ChatScreen = ({ messages }) => {
    
    const { roomId } = useParams();
    const logId = localStorage.getItem('id');
    const [receiver, setReceiver] = useState({})
    const [usermsg, setUsermsg] = useState([])

    const messagesEndRef = useRef(null)
    const [input, setInput] = useState("")
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        if (roomId) {
            const user = axios.get(`/profile/${roomId}`).then((res) => {
                console.log(res.data);
                setReceiver(res.data)
                
            }).catch((err) => {
                console.log('Error ' + err);
            })
            
            console.log(messages);
            const msg = messages.filter((val) => {
                return ((val.sender === logId || val.sender === roomId) && (val.receiver === roomId || val.receiver === logId));
            })
            console.log(msg);
            setUsermsg(msg);
        }
        scrollToBottom();
        return () => {
            setUsermsg([]);
        }

    }, [roomId])


    useEffect(() => {
        const msg = messages.filter((val) => {
            return ((val.sender === logId || val.sender === roomId) && (val.receiver === roomId || val.receiver === logId));
        })
        console.log(msg);
        setUsermsg(msg);
        
    }, [messages]);

    useEffect(() => {
        scrollToBottom()
        
    }, [usermsg]);

const sendmsg = async (e) => {
    e.preventDefault();

    try {

        if(validator.trim(input)!="")
        {
            await axios.post("/messages", {
                sender: logId,
                receiver: roomId,
                message: input,
                timestamp: "1245",
                // received:true,
    
            });
    
            
        }
        setInput("");

    }
    catch (e) {
        console.log('Error occured ' + e);
    }

}
return (

    <div className="chatscreen">

        <div className="chatscreen_header">
            <Avatar alt={receiver.name} src={`${process.env.PUBLIC_URL}/uploads/${receiver.profile}`} />
            <span>{receiver.name}</span>
        </div>


        <div className="chatscreen_div">
            {usermsg.map((message) => (
                <p className={`chatscreen_text ${message.sender === logId && "chatscreen_user"}`}>
                    {message.message}
                </p>
            )
            )}
            <div ref={messagesEndRef} />
        </div>



        <div className="chatscreen_footer">
            <EmojiEmotionsIcon className="footer_icon"/>
            <form action="">
                <input
                    type="text"
                    placeholder="Type a message.."
                    value={input}
                    onChange={
                        (e) => setInput(e.target.value)
                    }
                />
                <button onClick={sendmsg} type="submit">
                    <SendIcon className="footer_icon"/>
                </button>
            </form>

        </div>

    </div>
)
}

export default ChatScreen
