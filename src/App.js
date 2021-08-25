import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import {useState} from 'react'
import Login from './Login';
import { useStateValue } from './StateProver';

function App() {
  const [{user},dispatch] = useStateValue();
  return (
    <div className="app">
      {!user ? (
       <Login/>
      ):(<div className='app-body'>
      <Router>
      
        <Switch>
         
        <Route path="/rooms/:roomId">
        <Sidebar />
        <Chat/>    
  
          </Route>
        <Route path="/">
        <Sidebar />
        </Route>
        
        </Switch>
      </Router>
      </div>)}
      
    </div>
  );
}

export default App;
