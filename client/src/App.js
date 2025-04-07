import { useEffect,useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
 
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
import { getDataAPI, postDataAPI } from './utils/fetchData'
import { useHistory } from 'react-router-dom';

function App() {
  const { auth, status, modal, call,  userBlockReducer } = useSelector(state => state);
  const dispatch = useDispatch();
const history = useHistory()
 

  const token = auth.token;
 
  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        // manejar la ubicación aquí
      },
      error => {
        console.error(error);
      }
    );
  };

   
  const [ , setIsSubscribed] = useState(false);

  const checkExistingSubscription = async () => {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    setIsSubscribed(!!subscription);
  };

  // Ejecutar al montar el componente
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      checkExistingSubscription();
    }
  }, []);


  // Efecto para manejar usuarios bloqueados
  const blockedUser = userBlockReducer.blockedUsers.find(blockedUser => blockedUser.user._id === auth.user?._id);
  useEffect(() => {
    if (blockedUser) {
      history.push('/bloqueos');
    }
  }, [blockedUser, history]);

  // Efecto para inicializar socket y token
  useEffect(() => {

    dispatch(refreshToken());
    const socket = io();
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  // Efecto para obtener posts


  useEffect(() => {
    dispatch(getPosts());
    if (auth.token) {
      
      dispatch(getSuggestions(auth.token))
      dispatch(getNotifies(auth.token))
      dispatch(getUsers(auth.token))
      dispatch(getBlockedUsers(auth.token))

    }
  }, [dispatch, auth.token])

  // Función para manejar la suscripción a notificaciones push
  const handleSubscription = async () => {
    try {
      // Obtener la clave pública VAPID del servidor
      const response = await getDataAPI('vapid-public-key', token);
      console.log('Respuesta de la API:', response); // Verifica la respuesta de la API

      if (!response || !response.data || !response.data.publicKey) {
        throw new Error('No se encontró la clave pública VAPID');
      }

      const publicKey = response.data.publicKey;

      // Registrar el Service Worker
      const registration = await navigator.serviceWorker.ready;

      // Suscribir al usuario al servicio push
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });

      // Enviar la suscripción al servidor
      await postDataAPI('save-subscription', { subscription }, token);
      console.log('¡Usuario suscrito con éxito!');
    } catch (err) {
      console.error('Error al suscribirse:', err.message);
    }
  };


  // Función requerida para las notificaciones push
  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
  }



  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className={`App ${(status || modal) && 'mode'}`}>
        <div className="main">
           {!blockedUser && <Header />}

           <button
            onClick={async () => {
              const permission = await Notification.requestPermission();
              if (permission === 'granted') {
                await handleSubscription();
              } else {
                alert('Las notificaciones fueron bloqueadas');
              }
            }}
            disabled={!auth.token}
          >
            Activar Notificaciones
          </button>
          <button onClick={handleGetLocation}>Obtener ubicación</button>

        
          {status && <StatusModal />}
          {auth.token && <SocketClient />}
          {call && <CallModal />}
           


            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/informacionaplicacion" component={Informacionaplicacion} />
            <Route exact path="/roles" component={auth.token ? Roles : Login} />
            <Route exact path="/usersaction" component={auth.token ? UsersActionn : Login} />
            <Route exact path="/usersedition" component={auth.token ? Edicionusers : Login} />
            <Route exact path="/listausuariosbloqueados" component={auth.token ? listadeusuariosbloqueadoss : Login} />
            <Route exact path="/bloqueos" component={auth.token ? Bloqueos : Login} />

            <PrivateRouter exact path="/:page" component={PageRender} />
            <PrivateRouter exact path="/:page/:id" component={PageRender} />
          
        </div>
      </div>
    </Router>
  );
}

export default App;
