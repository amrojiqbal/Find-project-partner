import React,{useState} from 'react'
import { Link,useHistory } from 'react-router-dom'
import './Login.css'
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import axios from './axios'

const Login = ({choice}) => {
    const history=useHistory();
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    // const [user,setUser]=useState({})
    // const user={};
    console.log('Inside login'+ process.env.NODE_ENV);
    const user_login=async (e)=>{
        e.preventDefault();
        console.log(email);
        console.log(password);
        
        try{
            
            const res=await axios.post('/login',{
                email:email,
                password:password
            })
            setEmail("");
            setPassword("");

            const user=res.data;

            console.log(user);
            localStorage.setItem('id',`${res.data._id}`);
            
            history.push('/')
            console.log('Logged in');
            
        }
        catch(e){
            setEmail("");
            setPassword("");
            document.getElementsByClassName('invalid_id')[0].style.display="block";
            console.log('Error '+e)
            
        }
        
        // console.log(user.email)
        
    }
    const user_signup=async (e)=>{
        e.preventDefault();
        try{
            const user=await axios.post('/signup',{
                name:name,
                email:email,
                password:password
            })
            console.log(user.data);
            setEmail("");
            setPassword("");
            setName("");
            localStorage.setItem('id',`${user.data._id}`);
            history.push('/signup/create');
            
            
        }
        catch(e){
            document.getElementsByClassName('invalid_id')[0].style.display="block";
            console.log('Error in sugnup'+e);
        }
        console.log('Signup');
        setName("");
        setEmail("");
        setPassword("");
    }
    return (
        <div className="login">
            <div className="login_body">

                <div className="choice">
                    <Link to="/signup">
                        <p className={`${choice==="login" && "choice_other"} choice_text`}>
                            SIGN UP
                        </p>
                    </Link>

                    <Link to="/login">
                    <p className={`${choice==="signup" && "choice_other"} choice_text`}>
                            LOGIN
                        </p>
                    </Link>
                </div>
                <div className="login_details">

                    <form action="">
                        
                        {choice==='signup' && (

                        <div className="name form_content">
                            <PermIdentityIcon className="login-icon" />
                            <input 
                                value={name} 
                                onChange={
                                    (e) => setName(e.target.value)
                                }
                                type="text"
                                placeholder="Full Name"
                            />
                        </div>
                        )
                        }                   
                        <div className="email form_content">
                            <MailOutlineOutlinedIcon className="login-icon" />
                            <input 
                            value={email} 
                            onChange={
                                (e) => setEmail(e.target.value)
                            }
                            type="email" 
                            placeholder="E-mail" />

                        </div>
                        <div className="password form_content">
                            <LockOutlinedIcon className="login-icon" />
                            <input 
                            value={password} 
                            onChange={
                                (e) => setPassword(e.target.value)
                            }
                            type="password" 
                            placeholder="Your password" />
                        </div>
                        <p className="invalid_id">Invalid credential</p>

                        {choice==='login' ? (
                        <button onClick={user_login} className="login_btn">Login</button>

                        ):(
                        <button onClick={user_signup} className="login_btn">Sign Up</button>
                        )
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
