import React, { Component } from 'react';
import './App.css';
import LoginForm from './LoginForm';
import UserContainer from './UserContainer';
import AdminContainer from './AdminContainer';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Signup from './Signup';
import dotenv from 'dotenv';

class App extends Component {

  state = {
    currentUser: {},
    isLoggedIn: false,
    allZones: [],
    isLoaded: false,
    email: "",
    password: "",
    loginError: "",
  }

  componentDidMount() {
    if(localStorage.token) this.fetchData()
    console.log("1")
  }

  fetchData(){
    console.log("2")
    return Promise.all([
      fetch("https://emergency-tracker.herokuapp.com/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          if (!data.error) {
            this.setState({
              currentUser: data
            })
          }
      }),

      fetch("https://emergency-tracker.herokuapp.com/zones", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      })
        .then(response => response.json())
        // .then(console.log)
        .then(zones => {
            this.setState({
              allZones: zones,
              isLoaded: true
            })
        })
      ])
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(event.target.value)
  }

  logIn = (event) => {
    event.preventDefault();
    // console.log(this.state.email)
    // console.log(this.state.password)
    // console.log("3")
    
    fetch("https://emergency-tracker.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(data => {
        if (!data.error) {
          localStorage.token = data.token;
          this.setState({
            currentUser: data.user,
            isLoggedIn: !this.state.isLoggedIn
          }, () => {
            this.fetchData()
              .then( () =>  this.props.history.push('/user') )
          });
          
        } else {
          this.setState({
            loginError: data.error
          });
        }
      });
      
  };

  logOut = () => {
    this.setState({
      email: "",
      password: "",
      currentUser: {},
      isLoggedIn: !this.state.isLoggedIn
    })
    localStorage.clear()
    this.props.history.push("/login")
  }

  changeStatus0 = () => {
    // console.log(this.state.currentUser.id)
    fetch("https://emergency-tracker.herokuapp.com/users/"+this.state.currentUser.id, {
      method: "PATCH",
      body: JSON.stringify({
        status: 0
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`
      }
    }).then( e => {
      this.setState({
        currentUser:{
          ...this.state.currentUser,
          status: 0
        }
      })
    })
  }

  changeStatus1 = () => {
    fetch("https://emergency-tracker.herokuapp.com/users/"+this.state.currentUser.id, {
      method: "PATCH",
      body: JSON.stringify({
        status: 1
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`
      }
    }).then( e => {
      this.setState({
        currentUser:{
          ...this.state.currentUser,
          status: 1
        }
      })
    })
  }

  changeStatus2 = () => {
    fetch("https://emergency-tracker.herokuapp.com/users/"+this.state.currentUser.id, {
      method: "PATCH",
      body: JSON.stringify({
        status: 2
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`
      }
    }).then( e => {
      this.setState({
        currentUser:{
          ...this.state.currentUser,
          status: 2
        }
      })
    })
  }


  render() {
      return (
        <div className="App">
            <Switch>
              <Route exact path="/login" render={() =>  
                <LoginForm logIn={this.logIn} handleChange={this.handleChange} />
              }/>
              <Route path="/signup" render={() =>  
                <Signup logIn={this.logIn} signUp={this.signUp} handleChange={this.handleChange} />
              }/>
              <Route path="/user" render={(props) =>  
                <UserContainer {...props} logOut={this.logOut} currentUser={this.state.currentUser} changeStatus0={this.changeStatus0} changeStatus1={this.changeStatus1} changeStatus2={this.changeStatus2}/>
              }/>
              <Route path="/admin" render={(props) =>  
                <AdminContainer {...props} logOut={this.logOut} allZones={this.state.allZones} currentUser={this.state.currentUser} /> 
              }/>
              <Route path="/" render={ () => {
                if(!!localStorage.token) {
                  switch(this.state.currentUser.user_type) {
                    case 0: 
                      return <Redirect to='/user' />
                    // break;
                    case 1:
                      return <Redirect to='/admin' />
                    // break;
                    default:
                      return <Redirect to='/login' />
                  }
                } else {
                  return <Redirect to='/login' />
                }
              }} />
            </Switch>
        </div>
      )
  }
}

export default App;
