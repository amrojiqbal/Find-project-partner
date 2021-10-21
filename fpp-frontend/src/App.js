import React, { useEffect, useState } from "react"
import './App.css'
import Header from './Header'
import Card from './Card'
import Chats from './Chats'
import Chatscreen from './Chatscreen'
import Login from './Login'
import HeaderLogin from "./HeaderLogin"
import CreateForm from "./CreateForm"
import Pusher from 'pusher-js'
import { BrowserRouter as Router, Switch, useHistory, Route, Link } from "react-router-dom"
import axios from './axios'
import Profile from "./Profile"


function App() {

  const [messages, setMessages] = useState([]);
  const id = localStorage.getItem('id');
  // const { innerWidth: width, innerHeight: height } = window;
  useEffect(() => {
    console.log(id);
    axios.get("/messages/all").then((response) => {
      setMessages(response.data);
    });
  }, []);

  const [isDesktop, setDesktop] = useState(window.innerWidth > 780);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 780);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });
  useEffect(() => {

    console.log('Invoked ');
    const pusher = new Pusher('6919e4670960d89aa54b', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (data) => {
      // alert(JSON.stringify(data));
      setMessages([...messages, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages]);


  return (

    <Router>
      <Switch>

        <Route path="/signup/create">
          <div className="body-form">
            <HeaderLogin />
            <CreateForm />
          </div>
        </Route>

        <Route path="/profile">
          <Header />
          <Profile />
        </Route>

        <Route path="/login">
          <HeaderLogin />
          <Login choice="login" />
        </Route>

        <Route path="/signup">
          <HeaderLogin />
          <Login choice="signup" />
        </Route>

        <Route path="/chat/:roomId">
          {isDesktop ?
            <>
              <Header backpath="/" />
              <div className="app">
                <div className="app_body">
                  <Chats />
                  <Chatscreen messages={messages} />
                </div>
              </div>
            </>
            :
            <>
              <Header backpath="/chat" />
              <div className="app">
                <div className="app_body">
                  <Chatscreen messages={messages} />

                </div>
              </div>
            </>
          }
        </Route>

        <Route path="/chat">
          <Header backpath="/" />
          <div className="app">
            <div className="app_body">
              <Chats />
              {
                isDesktop ?
                  <div className="nochat">
                  </div>
                  :
                  <></>
              }
            </div>
          </div>
        </Route>

        <Route path="/">
          <Header />
          <Card />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
