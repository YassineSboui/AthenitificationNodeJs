import jwt from 'jsonwebtoken'

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

export { protect }
