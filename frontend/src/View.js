import React,{Component} from 'react';
import {Home} from './Home';
import {HashRouter, Route, Routes,NavLink} from 'react-router-dom';
import './View.css';
import {Leave} from './Leave';
import one from './one.jpg';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import './Dashboard.css';
import { Contact } from './Contact';


// Creating our own theme
const theme = {
    background: '#C9FF8F',
    headerBgColor: '#197B22',
    headerFontSize: '20px',
    botBubbleColor: '#0F3789',
    headerFontColor: 'white',
    botFontColor: 'white',
    userBubbleColor: '#FF5733',
    userFontColor: 'white',
};
// Set some properties of the bot
const config = {
   // botAvatar: "one.jpg",
    floating: true
};
export class View extends Component{
    render(){
        return(
            <div className="App container">
            <header>
            <h3 className="d-flex justify-content-center header-1">
              Welcome to Leave Management System
            </h3>
            </header>
            
            <marquee>Hexaware Technologies pvt.ltd</marquee>
            <ThemeProvider theme={theme}>
                <ChatBot

                    headerTitle="Sam"
                    steps={[
                        {
                            id: '1',
                            message: 'Hey Maverick!',
                            trigger: '2',
                        },                      
                        
                        {
                            id: '2',

                            message: 'Please write your username',
                            trigger: '3',
                        }, {
                            id: '3',

                            user: true,
                            trigger: '4',
                        }, {
                            id: '4',
                            message: " hi {previousValue}, how can I help you?",
                            trigger: '5',
                        }, {
                            id: '5',
                            options: [

                                { value: 1, label: 'Raise Ticket',trigger:'6' },
                                { value: 2, label: 'Service Help',trigger:'11' }
                     
                            ],
                        },{
                          id:'6',
                          message:"Please Mention the reason",
                          trigger:'7',
                        },{
                          id:'7',
                          user:true,
                          trigger:'8',
                        },
                        {
                          id:'8',
                          message:"Mention your Manager Name",
                          trigger:'9',
                        },{
                          id:'9',
                          user:true,
                          trigger:'10',
                        },
                        {
                          id:'10',
                          message:"Stay tuned!! We'll let {previousValue} know your concern...",
                          end: true
                        },
                        {
                          id:'11',
                          message:"Please Contact GSD for Service help...",
                          trigger:'5',
                        },
                    ]}
                    {...config}
 
                />
            </ThemeProvider>
              
            <nav className="navbar navbar-expand-sm bg-light navbar-dark">
              <ul className="navbar-nav">
                <li className="nav-item- m-1">
                  <NavLink className="btn btn-light btn-outline-primary" to="/View">
                    Home
                  </NavLink>
                </li>

                <li className="nav-item- m-1">
                  <NavLink className="btn btn-light btn-outline-primary" to="/myLeaves">
                    MyLeaves
                  </NavLink>
                </li>
                <li className="nav-item- m-1">
                  <NavLink className="btn btn-light btn-outline-primary" to="/contact">
                    Contact
                  </NavLink>
                </li>
                <li className="nav-item- m-1">
                  <NavLink className="btn btn-light btn-outline-primary" to="/about">
                    About
                  </NavLink>
                </li>
                <li className="nav-item- m-1">
                  <NavLink className="btn btn-light btn-outline-primary" to="/">
                    LogOut
                  </NavLink>
                </li>
              </ul>
            </nav>
            <div>
                <img src={one} alt="image" height={700} width={1300}/>
            </div>


{/*             
      <Routes>
        <Route exact path='/home' element={<Home/>}/>
        <Route exact path='/contact' element={<Contact/>}/>
        <Route exact path='/myLeaves' element={<Leave/>}/>
        
      </Routes> */}
    </div>
      
        )
    }
}