import React, { useState, useEffect } from 'react'
import './Card.css'
import { Avatar } from '@material-ui/core'
import TinderCard from 'react-tinder-card'
import wait from './image/wait.png'
import axios from './axios'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
const Card = () => {
    const [cards, setCards] = useState([]);
    const [liked, setLiked] = useState({
        liked: {}
    });
    // const [liked,setLiked]=useState([]);
    const _id = localStorage.getItem("id");
    console.log(_id);
    const history = useHistory();

    useEffect(() => {
        if (_id) {

            axios.get(`/login/${_id}`).then((response) => {
                // console.log(response);
                setCards(response.data);
            }).catch((e) => {
                console.log('Error' + e);
            });
        }
        else {
            history.push('/login');
        }

        //123 
    }, []);
    // console.log(cards);
    const onswipe = async (direction, user) => {
        console.log('You swipped' + user.name)
        const user_id = user._id;
        const val = direction === 'left' ? false : true;
        try {
            const update_user1 = await axios.post(`/update/${_id}`, {
                liked: {
                    [user_id]: val
                }
            });

            const update_user2 = await axios.post(`/update/${user_id}`, {
                liked: {
                    [_id]: val
                }
            });

            console.log(update_user1.data);
            console.log(update_user2.data);
        }
        catch (e) {
            console.log('Error at Card ' + e);
        }



    }
    console.log(liked);
    return (
        <div className="cards">
            <div className="card-outer">
                {cards.length ?
                    (
                        cards.map((val) => {
                            return (
                                <TinderCard className="tinder-card" preventSwipe={['up', 'down']} onSwipe={(dir) => onswipe(dir, val)}>
                                    <div class="card-container">
                                        {/* <span class="pro">PRO</span> */}
                                        <Avatar id="round" src={`${process.env.PUBLIC_URL}/uploads/${val.profile}`} alt={val.name} />
                                        <h2 className="card_name">{val.name}</h2>
                                        <h5>Kolkata, India</h5>
                                        <h3 className="card_role">{val.role}</h3>
                                        <div class="card_social">
                                            <a href={`https://github.com/${val.username}`} target="_blank" >
                                                <img src={`${process.env.PUBLIC_URL}/icon/github-hover.png`} alt="" />
                                            </a>
                                            <a href="https://linkedin.com/feed" target="_blank">
                                                <img src={`${process.env.PUBLIC_URL}/icon/linkedin.png`} alt="" id="card_linkedin"/>
                                            </a>
                                        </div>
                                        <div class="card_skills">
                                            <h5>Skills</h5>
                                            <ul>
                                                {val.skills.split(',').map((step)=> <li>{step}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                </TinderCard>
                            )
                        })
                    )
                    :
                    (
                        <div className="noprofile">
                            <div className="left">
                                <h2>OOPS!!</h2>
                                <h2>NO PROFILE TO SHOW</h2>
                            </div>
                            <div className="right">
                                <img src={wait} alt="" />
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default Card
