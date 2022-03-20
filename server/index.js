import { Server } from 'socket.io';
import { v4 as uuid } from 'uuid';

const io = new Server(8080, {
    cors: {
        origin: '*',
    }
})

const users = new Map();
const messages = [];

io.on('connection', socket => {
    //when a new user enters chat
    console.log('user connected');
    
    socket.on('user', user => {
        const newUser = {
            id: uuid(),
            name: user,
        };
        users.set(socket.id, newUser);
        //send new user info and messages to new user
        socket.emit('user', newUser);
        socket.emit('msg', messages);
        //send updated users list to all users
        io.emit('users', Array.from(users.values()));
    })

    //when new message is sent
    socket.on('msg', msg => {
        messages.push(msg);
        io.emit('msg', messages)
    });

    //when user leaves chat
    socket.on('disconnect', () => {
        users.delete(socket.id);
        io.emit('users', Array.from(users.values()));
    })
})


