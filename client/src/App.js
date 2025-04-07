import { useEffect } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import PageRender from './customRouter/PageRender'
import PrivateRouter from './customRouter/PrivateRouter'

import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'

import Alert from './components/alert/Alert'
import Header from './components/header/Header'
import StatusModal from './components/StatusModal'

import { useSelector, useDispatch } from 'react-redux'
import { refreshToken } from './redux/actions/authAction'
import { getPosts } from './redux/actions/postAction'
import { getSuggestions } from './redux/actions/suggestionsAction'

import io from 'socket.io-client'
import { GLOBALTYPES } from './redux/actions/globalTypes'
import SocketClient from './SocketClient'

import { getNotifies } from './redux/actions/notifyAction'
import CallModal from './components/message/CallModal'
import Roles from './pages/roles'
import UsersActionn from './pages/UsersActionn'
import Edicionusers from './pages/edicionusers'
import listadeusuariosbloqueadoss from './pages/listadeusuariosbloqueadoss'
import Bloqueos from './pages/bloqueos'
import { getUsers } from './redux/actions/userAction'
import { getBlockedUsers } from './redux/actions/userBlockAction'
import Informacionaplicacion from './pages/informacionaplicacion'
 
function App() {
  const { auth, status, modal, call } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())

    const socket = io()
    dispatch({type: GLOBALTYPES.SOCKET, payload: socket})
    return () => socket.close()
  },[dispatch])

  useEffect(() => {
    dispatch(getPosts());
    if (auth.token) {
        dispatch(getSuggestions(auth.token));
        dispatch(getNotifies(auth.token));
        dispatch(getUsers (auth.token));
        dispatch(getBlockedUsers(auth.token));
 
    }
}, [dispatch, auth.token]);

  
  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    else if (Notification.permission === "granted") {}
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {}
      });
    }
  },[])

 

  return (
    <Router>
      <Alert />

      <input type="checkbox" id="theme" />
      <div className={`App ${(status || modal) && 'mode'}`}>
        <div className="main">
          <Header />
          {status && <StatusModal />}
          {auth.token && <SocketClient />}
          {call && <CallModal />}
           <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/informacionaplicacion" component={Informacionaplicacion} />
          <Route exact path="/roles" component={auth.token? Roles: Login} />
          <Route exact path="/usersaction" component={auth.token? UsersActionn: Login} />
          <Route exact path="/usersedition" component={auth.token? Edicionusers: Login} />
          <Route exact path="/listausuariosbloqueados" component={auth.token? listadeusuariosbloqueadoss: Login} />
          <Route exact path="/bloqueos" component={auth.token? Bloqueos: Login} />

          <PrivateRouter exact path="/:page" component={PageRender} />
          <PrivateRouter exact path="/:page/:id" component={PageRender} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
