const user_discussionService = require('./services/user_discussionService')
const discussionService = require('./services/discussionService')
const messageService = require('./services/messageService')


module.exports = (io) => {

    io.on("connection", (socket) => {
        console.log(`User - ${socket.id}, connecting`)

        socket.on('join_room', async (data) => {
            socket.removeAllListeners("send_message");

            const {id, user} = data
            socket.roomId = String(id)
            socket.user = user


            const candidate = await user_discussionService.findByOption({
                user_id: socket.user.id,
                discussion_id: socket.roomId
            })

            socket.join(socket.roomId)

            const messages = await messageService.getAllByOption({discussion_id: socket.roomId})

            socket.emit('discussion_messages', messages)

            if (!candidate) {
                io.to(socket.roomId).emit('welcome', {...user, message: 'присоединился', server: true})
                await user_discussionService.create({user_id: socket.user.id, discussion_id: socket.roomId})
            }


            socket.on('send_message', async (data) => {
                const message = await messageService.create({
                    message: data.message,
                    user_id: socket.user.id,
                    discussion_id: socket.roomId,
                    date_send: new Date()
                })
                let tempUser = {...socket.user}
                delete tempUser.id
                io.to(socket.roomId).emit('receive_message', {...message[0], ...tempUser})
            })

            socket.on('exit_room', async () => {
                await user_discussionService.delete({user_id: socket.user.id, discussion_id: socket.roomId})
                io.to(socket.roomId).emit('exit_room', {...socket.user, message: 'покинул беседу', server: true})
            })


            socket.on('kick_user', async (data) => {
                await user_discussionService.delete({user_id: data.id, discussion_id: socket.roomId})
                io.to(socket.roomId).emit('kick_user', data.id)
                io.to(socket.roomId).emit('exit_room', {...data, message: 'покинул беседу', server: true})
            })

            socket.on('edit_message', async (data) => {
                const updateMessage = await messageService.update(data.id, {message: data.message})
                console.log(updateMessage)
                io.to(socket.roomId).emit('edit_message', (updateMessage[0]))
            })

            socket.on('delete_message', async (data) => {
                await messageService.delete(data.id)
                io.to(socket.roomId).emit('delete_message', data.id)
            })

            socket.on('delete_room', async () => {
                await discussionService.delete(socket.roomId)
                io.to(socket.roomId).emit('delete_room')
            })
        })

        socket.on('leave_room', () => {
            socket.removeAllListeners("send_message");
        })
    })
}
