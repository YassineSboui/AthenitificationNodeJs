import bcrypt from 'bcryptjs'
const users = [
  {
    username: 'AdminUser',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    username: 'johnDoe',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    username: 'YassineSb',
    password: bcrypt.hashSync('123456', 10),
  },
]
export default users
