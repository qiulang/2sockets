const io = require('socket.io-client')
const { debug } = require("debug")
const log = debug("so:client")
const server = 'http://localhost:3000'
const user_id = '1_2_1000'
// let socket
let wsBit = 0
let wsTimeout

function setupWS(client) {
  let socket = io(server, { transports: ['websocket']})
//   socket = io(server, { transports: ['websocket'],autoUnref: true })
  socket.on('connect', function () {
    log(`Connected to local ws server with ${socket.id}`)
    socket.emit('login', { user_id, client }, reply => {
        wsBit +=1
        log(`Current connection:${wsBit}`) 
    })
  })
  socket.on('logoff', (msg) => {
    log(`${socket.id}:${client} should be kicked off for: ${msg}`)
    socket.close()
  })
  socket.on('disconnect',(msg) =>{
    log(`${socket.id}: disconnect: ${msg}`)
    wsBit -=1
    log(`Current connection:${wsBit}`) 
  })
}

function start(client) {
  setupWS(client)
  log(`Start to connect to ws server:${server} ... using client:${client}`)
}

function main() {
  start('nodejs')
  setTimeout(()=> {
    log('open another connection in 5 seconds')
    start("browser")
  },5000)
}

main()