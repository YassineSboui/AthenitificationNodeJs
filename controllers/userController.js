import generatToken from '../utils/generateToken.js'
import users from '../data/users.js'

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
    var User = {
      username: username,
      password: await bcrypt.hash(password, 10),
    }
    users.push(User)
    return res.json(201, { user: User, message: 'User Created Successfully ' })
  }
}

//@desc Auth user & get token
//@route POST /api/users/login
//@acess Public

const authUser = async (req, res) => {
  const { username, password } = req.body
  const userExists = users?.find((user) => user.username === username)

  if (userExists) {
    const verifPassword = await bcrypt.compare(password, user.password)

    if (verifPassword) {
      const token = generatToken(username)
      return res.json(200, { user: username, token: token })
    } else {
      res.status(401)
      throw new Error('Wrong Password')
    }
  } else {
    res.status(401)
    throw new Error('Invalid Username')
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

export { authUser, getUserProfile, registerUser }
