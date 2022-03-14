const { Server } = require("socket.io");
const { debug } = require("debug")
const io = new Server();
const log = debug("so:server")
let records = {}

io.on("connection", (socket) => {
  socket.on("login",({user_id,client},fn) =>{
      log(`${user_id}:${client} using ${socket.id} logged in`)
      fn("accept")
      let old_socket = records[user_id]
      if ( old_socket ) {
        log(`The same ${user_id} with ${old_socket} has logged in, let him log off first`)
        io.to(old_socket).emit('logoff', 'another login')
      }
      records[user_id] = socket.id
  })
  socket.on("disconnect",(reason) => {
      log(`${socket.id} disconnected with reason ${reason}`)
  })
});

io.listen(3000);