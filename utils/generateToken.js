import jwt from 'jsonwebtoken'

const generateToken = (username) => {
  return jwt.sign({ username }, 'Yassine', { expiresIn: '30d' })
}
export default generateToken
