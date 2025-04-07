require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const SocketServer = require('./socketServer')
const { ExpressPeerServer } = require('peer')
const path = require('path')
const { autoUnblockUsers } = require('./controllers/autoUnBlockUser')
const webpush = require('web-push');
const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// ==================================================
// 🔥 1. Configuración OPCIONAL de Web-Push (desactivada por defecto)
// ==================================================
if (process.env.ENABLE_PUSH === 'true') {
   
  // 🔹 Ruta alternativa para notificaciones push
  app.post('/api/push-notify', async (req, res) => {
    try {
      const { subscription, title, body } = req.body
      await webpush.sendNotification(subscription, JSON.stringify({
        title: title || "¡Nuevo!",
        body: body || "Tienes una actualización",
        url: "/notificaciones"
      }))
      res.json({ success: true })
    } catch (err) {
      console.error("Error en push:", err)
      res.status(500).json({ error: err.message })
    }
  })
}

// ==================================================
// 🚀 Configuración existente (inalterada)
// ==================================================
const http = require('http').createServer(app)
const io = require('socket.io')(http)
io.on('connection', socket => { SocketServer(socket) })
ExpressPeerServer(http, { path: '/' })

// Routes (sin cambios)
app.use('/api', require('./routes/authRouter'))
app.use('/api', require('./routes/userRouter'))
app.use('/api', require('./routes/postRouter'))
app.use('/api', require('./routes/commentRouter'))
app.use('/api', require('./routes/notifyRouter')) // ✅ Tu sistema actual
app.use('/api', require('./routes/messageRouter'))
app.use('/api', require('./routes/blockUserRouter'))
 

// Configuración de MongoDB (sin cambios)
mongoose.connect(process.env.MONGODB_URL, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if (err) throw err
  console.log('Connected to MongoDB')
})

// 🕒 Ejecutar cada 5 minutos (sin cambios)
setInterval(autoUnblockUsers, 5 * 60 * 1000)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000
http.listen(port, () => {
  console.log('Server is running on port', port)
  if (process.env.ENABLE_PUSH === 'true') {
    console.log('🔔 Notificaciones PUSH activadas')
  }
})