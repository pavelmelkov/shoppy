const bcrypt = require('bcryptjs')

const users = [
    {
        name: 'Admin user',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'user_1',
        email: 'user_1@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'user_2',
        email: 'user_2@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'user_3',
        email: 'user_3@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

module.exports = users