import * as services from './service';

export function connect(io) {
  try {
    io.on('connection', (socket) => {
      console.log('connected');
      initEvent(socket, io);
    });
  } catch (error) {
    console.log(error);
  }
}

function initEvent(socket, io) {
  try {
    joinRoom(socket, io);
    leaveRoom(socket, io);
    disconnect(socket);

    createNewTask(socket, io);
    updateTask(socket, io);
    deleteTask(socket, io);
  } catch (error) {
    console.log(error);
  }
}

function disconnect(socket) {
  socket.on('disconnect', (payload) => {});
}

function joinRoom(socket, io) {
  socket.on('join-room', (payload) => {
    console.log('jone ko');
    socket.join('company');
  });
}

function leaveRoom(socket, io) {
  socket.on('leave-room', (payload) => {
    socket.leave('company');
  });
}

function createNewTask(socket, io) {
  socket.on('create-task', async (payload) => {
    const newTask = await services.createTask(payload);
    console.log(newTask);
    socket.to('company').emit('recieve-task', newTask);
  });
}
function updateTask(socket, io) {
  socket.on('update-task', (payload) => {
    services.updateTask(payload._id, payload);
    console.log(payload);

    socket.to('company').emit('recieve-task', { ...payload, type: 'update' });
  });
}
function deleteTask(socket, io) {
  socket.on('delete-task', (payload) => {
    services.deleteTask(payload._id);
    socket.to('company').emit('recieve-task', { ...payload, type: 'delete' });
  });
}

module.exports = {
  connect: connect,
};
