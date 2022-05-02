import React from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import About from "./About"

import Tips from "./Tips"
import Vehicle from "./Vehicle"
import Newrequest from "./Newrequest"
import { Layout } from 'antd';
import '../App.css';


const App=()=> {
  return (
      
     
       <Layout>
         <div className="routes">
         <AuthProvider>
         <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <PrivateRoute exact path="/vehicle" component={Vehicle} />
              <PrivateRoute exact path="/newrequest" component={Newrequest }/>
              <PrivateRoute exact path="/about"  component={About }/>
              <PrivateRoute exact path="/Tips" component={Tips }/>
          </Switch>
          </AuthProvider>
         </div>
       </Layout>
    
   
     
    
  )
}

export default App
