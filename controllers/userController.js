import generatToken from '../utils/generateToken.js'
import users from '../data/users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//@desc Register a new User
//@route POST /api/users
//@acess Public

const registerUser = async (req, res) => {
  const { username, password } = req.body
  const userExists = users?.find((user) => user.username === username)
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  } else {
    const cryptedPassword = await bcrypt.hash(password, 10)
    var User = {
      username: username,
      password: cryptedPassword,
    }
    users.push(User)
    return res
      .status(201)
      .json({ user: User, message: 'User Created Successfully ' })
  }
}

//@desc Auth user & get token
//@route POST /api/users/login
//@acess Public

const authUser = async (req, res) => {
  const { username, password } = req.body
  const userExists = users?.find((user) => user.username === username)

  if (userExists) {
    const verifPassword = await bcrypt.compare(password, userExists.password)

    if (verifPassword) {
      const token = generatToken(username)
      return res.status(200).json({ user: username, token: token })
    } else {
      res.status(401)
      throw new Error('Wrong Password')
    }
  } else {
    res.status(401)
    throw new Error('Invalid Username')
  }
}

const protect = async (req, res, next) => {
  let token
  if (req.headers.authorization) {
    try {
      token = req.headers.authorization

      const decoded = jwt.verify(token, 'Yassine')

      req.user = users?.find((user) => user.username === decoded.username)

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized , Token  failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized , No Token')
  }
}

//@desc Get user profile
//@route POST /api/users/profile
//@acess Private

const getUserProfile = async (req, res) => {
  const user = users?.find((user) => user.username === req.user.username)
  if (user) {
    res.json({
      user: user,
    })
  } else {
    res.status(404)
    throw new Error('Inalid email or passowrd')
  }
}

export { authUser, getUserProfile, registerUser, protect }
