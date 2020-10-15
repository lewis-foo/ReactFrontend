import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import pMinDelay from 'p-min-delay'
import {
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Cookies from 'js-cookie';
import 'materialize-css/dist/css/materialize.min.css';
import Loadable from 'react-loadable';
import LoadingAnimation from './components/LoadingAnimation'

import axios from 'axios'
import CreateCourse from './views/CreateCourse'
import ViewCourses from './views/ViewCourses'
import ViewCourse from './views/ViewCourse'
import LessonView from './views/LessonView'
import EditCourse from './views/EditCourse'
import Profile from './views/Profile'
const LoadLogin = Loadable({
  loader: () => pMinDelay(import('./views/Login'), 1000),
  loading() {
    return (
      <LoadingAnimation />
    )
  },
  delay: 0
});
const LoadSignup = Loadable({
  loader: () => pMinDelay(import('./views/Signup'), 1000),
  loading() {
    return (
      <LoadingAnimation />
    )
  },
  delay: 0
});


class App extends React.Component {
  state = {
    user: null
  }
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }
   login = async() => {
    await axios.post('/api/auth', { token: Cookies.get('token') }).then((response) => {
      axios.defaults.headers.common['Authorization'] = Cookies.get('token');
      console.log(response.data)
      if (response.data.response == 1) {
        console.log(response.data)
                
        this.setState({
          user: {
            displayName: response.data.username
          }
        })
      } else {
        this.setState({
          user: null
        })
      }
    })
  }
  logout() {
    this.login()
  }
  componentDidUpdate() {

  }
  componentDidMount() {
    this.login()
  }
  render() {
    return (
      <Router>
        <Navbar logout={this.logout} user={this.state.user} />
        <Switch>
          <Route path="/view-courses">
            <ViewCourses user={this.state.user} />
          </Route>
          <Route path="/edit-course">
            <CreateCourse />
          </Route>
          <Route path="/edit/course/:id" component={EditCourse}>
          </Route>
          <Route path="/course/:id" component={ViewCourse}>
          </Route>
          <Route path="/course/:id" component={ViewCourse}>
          </Route>
          <Route path="/lesson/:id" component={LessonView}>
          </Route>
          <Route path="/create-course">
            <CreateCourse />
          </Route>
          <Route path="/profile">
              <Profile user={this.state.user} />
          </Route>
          <Route path='/login'>
            <LoadLogin onLogin={this.login} />
          </Route>
          <Route path='/signup'>
            <LoadSignup onLogin={this.login} />
          </Route>
          <Route path="/">
            <ViewCourses user={this.state.user} />
          </Route>
        </Switch>
      </Router>
    );
  }

}

export default App;
