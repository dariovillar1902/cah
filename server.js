const server = require('express')();
const http = require('http').createServer(server);
const io = require('socket.io')(http);
let players = [];
let anfitrion;
let nombresJugadores = [];

io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);
    players.push(socket.id);
    console.log(players.length);
    
    if (players.length === 1) {
        anfitrion = socket.id;
        io.emit('isPlayerA', anfitrion);
    } else {
        io.emit('otroJugador');
    };

    socket.on('unidoASala', function (nombreJugador) {
        nombresJugadores.push(nombreJugador);
        console.log(nombresJugadores);
        io.emit('unidoASala', nombresJugadores);
    });

    socket.on('iniciarJuego', function () {
        io.emit('iniciarJuego', nombresJugadores);
    });

    socket.on('dealCards', function () {
        io.emit('dealCards');
    });

    socket.on('cartaReemplazo', function () {
        io.emit('cartaReemplazo');
    });

    socket.on('cardPlayed', function (gameObject, isPlayerA) {
        io.emit('cardPlayed', gameObject, isPlayerA);
    });

    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
        players = players.filter(player => player !== socket.id);
    });
});

http.listen(3000, function () {
    console.log('Server started!');
});