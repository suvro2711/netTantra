import React from 'react'
import axios from 'axios'
import './App.css'
import { Route, Switch } from 'react-router-dom'

import Profile from './pages/profile'
import Registration from './pages/registration'
import SignIn from './pages/signIn'
import InputField from './components/inputField'
import SearchBox from './pages/searchBox'
import Reset from './pages/reset'


const App = () => {

  return (
    <Switch>
      <Route path="/profile" render={() => <Profile></Profile>}></Route>
      <Route path="/registration" render={() => <Registration></Registration>}></Route>
      <Route path="/reset" render={() => <Reset></Reset>}></Route>
      <Route path="/" render={() => <SignIn></SignIn>}></Route>
    </Switch>
  )
}

export default App

