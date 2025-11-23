import express from 'express'
import { Register, Login, GoogleLogin, Logout } from '../controllers/auth.controller.js'
import { authenticate } from '../middleware/authenticate.js'

const AuthRoute = express.Router()

AuthRoute.post('/register', Register)
AuthRoute.post('/login', Login)
AuthRoute.post('/google-login', GoogleLogin)
AuthRoute.post('/logout', authenticate, Logout)

export default AuthRoute
