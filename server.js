const express = require('express');
const app = express();
const path = require('path');

const socketIO = require('socket.io');

//settings
app.set('port', process.env.PORT || 3000);

// static files, apunta al index como inicio e la pagina
app.use(express.static(path.join(__dirname, 'public')));

//start the server
const server = app.listen(app.get('port'), () => {
    console.log("server on port", app.get('port'));

});
//Web socket
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('new connection', socket.id);
    //evento para cuando el usuario envía un mensaje
    socket.on('chat:message', (data) => {
        console.log("data: ", data);
        io.sockets.emit('chat:message', data);
    });
    //evento para cuando el usuario esté escribiendo
    socket.on('chat:typing', (data) => {
        console.log("username: ", data);
        socket.broadcast.emit('chat:typing',data) //para emitir a todos menos a mí
        //io.sockets.emit('chat:message',data);
    });
});