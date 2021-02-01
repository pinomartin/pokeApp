import { useEffect, useState } from "react";
import { Pokemons } from "./components/Pokemons";
import  NavBar  from "./components/NavBar";
import  Login  from "./components/Login";

import {
  BrowserRouter as Router, 
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import { auth } from "./firebase";

function App() {

  const [firebaseUser, setFirebaseUser] = useState(false);

  useEffect(() => {
    const fetchUser = () => {
      auth.onAuthStateChanged(user => {
       
        if(user){
          setFirebaseUser(user)
        }else{
          setFirebaseUser(null)
        }
      })
    }
    fetchUser()
  },[])


  const PrivateRoute = ({component, path, ...rest}) => {
      if(localStorage.getItem('user')){
        const storageUser = JSON.parse(localStorage.getItem('user'))
        if( storageUser.uid === firebaseUser.uid ){
          //IMPORTANTE !!!! siempre usar en return,,,, 
          return <Route component={component} path={path} {...rest}/> 
        }else{
          return <Redirect to="/login" {...rest} /> //en este caso el rest seria el exact
        }
      }else{
        return <Redirect to="/login" {...rest} /> //en este caso el rest seria el exact
      }
  }


  return firebaseUser !== false ? (
    <Router>
      <div className="container mt-2">      
        <NavBar />
          <Switch>
            <PrivateRoute component={Pokemons} path="/" exact />
            <Route component={Login} path="/login"/>
          </Switch>
        </div>
    </Router>
  ):
  (<div>Cargando</div>)
}

export default App;
