const io = require('socket.io-client')
const { debug } = require("debug")
const log = debug("so:client")
const server = 'http://localhost:3000'
const user_id = '1_2_1000'
let socket
let wsBit = 0

function setupWS(client) {
//   let socket = io(server, { transports: ['websocket']}) //correct, should use a function scope variable
  socket = io(server, { transports: ['websocket']}) //wrong!! Should NOT use a global variable
  socket.on('connect', function () {
    log(`${client} connected to local ws server with ${socket.id}`)
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