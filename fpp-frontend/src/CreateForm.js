import axios from './axios';
import React, { useState,useEffect } from 'react'
import './CreateForm.css'
import { Avatar } from '@material-ui/core'
import { useHistory } from 'react-router';

const CreateForm = () => {
    const history = useHistory();
    const id = localStorage.getItem("id");
    const [userprofile,setUserprofile]=useState({});
    useEffect(() => {

        axios.get(`/profile/${id}`).then((res)=>{
            console.log(res);
            setUserprofile(res.data);
        }).catch((e)=>{
            console.log('Error at Form'+e);
        })
        
    }, []);

    const [profile, setProfile] = useState('');

    const [details, setDetails] = useState({
        role: "",
        qualification: "",
        skills: "",
        required_role: "",
        username: "",
        // profile:""
    });
    const profile_update=(e)=>{
        setProfile(e.target.files[0])
        console.log(e.target.files[0]);
    }
    const update = (e) => {
        const { name, value } = e.target;

        setDetails((prevState) => ({
            ...prevState,
            [name]: value
        }));

    }
    const submit_update = async (e) => {
        e.preventDefault();
        try {
            
            const formData=new FormData();
            formData.append("role",details.role);
            formData.append("qualification",details.qualification);
            formData.append("skills",details.skills);
            formData.append("username",details.username);
            formData.append("required_role",details.required_role);
            if(profile!=='')
            {
                
                formData.append("profile",profile);
            }
            else{
                console.log(userprofile.profile);
                // formData.append("profile",userprofile.profile);
            }
            // const user=null;
            console.log(profile);
            if(profile!=='')
            {
                const user = await axios.post(`/signup/create/${id}`,formData);
                console.log('Inside Signup'+user);
            }
            else{
                const user=await axios.post(`/update/${id}`,details);
                console.log('Inside Update'+user.data);
            }
            // console.log(formData)
            
            setDetails({
                role: "",
                qualification: "",
                skills: "",
                required_role: "",
                username: ""
            })
            setProfile("");
            history.push('/profile')
        } catch (error) {
            console.log('Error ' + error);
        }

    }

    return (
        <div className="createform">
            <div className="createform_body">
                <form action="" encType="multipart/form-data">
                    <div className="profile_div">
                        <input type="file" name="profile" id="files" onChange={profile_update} hidden />
                        <label htmlFor="files">
                            <Avatar src={`${process.env.PUBLIC_URL}/uploads/${userprofile.profile}`} alt="Select profile" id="profile-avatar" />
                        </label>
                    </div>

                    <div className="role createform_input">
                        <span>Role </span>
                        <div className="input">
                            <select name="role" id="role_choice" value={details.role} onChange={update} >
                                <option value="none" selected >
                                    Select an Option
                                </option>
                                <option value="Frontend Development">
                                    Frontend Development
                                </option>
                                <option value="Backend Development">
                                    Backend Development
                                </option>
                                <option value="FullStack Development">
                                    FullStack Development
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="qualification createform_input">
                        <span>
                            Qualification
                        </span>
                        <div className="input">

                            <input type="text" placeholder="Your Qualification"
                                name="qualification"
                                value={details.qualification} onChange={update} />
                        </div>

                    </div>
                    <div className="skills createform_input">
                        <span>
                            Skills
                        </span>
                        <div className="input">

                            <textarea name="skills" id="skills" cols="20" rows="3" placeholder="Skills separated by commas"
                                value={details.skills} onChange={update} ></textarea>
                        </div>

                    </div>
                    <div className="github createform_input">
                        <span>
                            Github
                        </span>
                        <div className="input">

                            <input name="username" type="text" placeholder="Your username"
                                value={details.username} onChange={update} />
                        </div>

                    </div>

                    <div className="required_profile createform_input">
                        <span>
                            Required Role
                        </span>
                        <div className="input">
                            <select name="required_role" id="required_role"
                                value={details.required_role} onChange={update}
                            >
                                <option value="none" selected hidden>
                                    Select an Option
                                </option>
                                <option value="Frontend Development" selected>
                                    Frontend Development
                                </option>
                                <option value="Backend Development">
                                    Backend Development
                                </option>
                                <option value="Fullstack Development">
                                    FullStack Development
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className="form_btn">
                        <button type="submit" className="btn" onClick={submit_update} >Submit</button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default CreateForm
