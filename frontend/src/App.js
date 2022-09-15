import logo from './logo.svg';
import './App.css';
import {HashRouter, Route, Routes,NavLink} from 'react-router-dom';
import {Home} from './Home';
import {Leave} from './Leave';
import {Manager} from './Manager';
import {Navbar} from 'react-bootstrap';
import {View} from './View';
import { Dashboard } from './DashBoard';
import { Contact } from './Contact';
import { About } from './About';
import { Login } from './Login';
import { LoginM } from './LoginM';
import Horizontalchart from './Chart';

function App() {
  return (
    
    <HashRouter>

      <Routes>
        <Route exact path='/' element={<Dashboard/>}/>
        <Route exact path='/loginOne' element={<Login/>}/>
        <Route exact path='/login' element={<LoginM/>}/>
        <Route exact path='/manager' element={<Manager/>}/>
        <Route exact path='/View' element={<View/>}/>
        <Route exact path='/dashboard' element={<Dashboard/>}/>
        <Route exact path='/home' element={<Home/>}/>
        <Route exact path='/contact' element={<Contact/>}/>
        <Route exact path='/about' element={<About/>}/>
        <Route exact path='/myLeaves' element={<Leave/>}/>
        <Route exact path='/chart' element={<Horizontalchart/>}/>
        
      </Routes>

    </HashRouter>


  );

}

export default App;
