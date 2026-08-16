import jwt from 'jsonwebtoken'
import { handleError } from '../helpers/handleError.js'

export const onlyadmin = async (req, res, next) => {
    try {
        console.log("Cookies received:", req.cookies)

        const token = req.cookies.access_token

        console.log("Access token exists:", !!token)

        if (!token) {
            return next(handleError(403, 'Unauthorized'))
        }

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)

        console.log("Decoded token:", decodeToken)

        if (decodeToken.role === 'admin') {
            req.user = decodeToken
            next()
        } else {
            return next(handleError(403, 'Unauthorized'))
        }

    } catch (error) {
        console.log("JWT error:", error.message)
        next(handleError(500, error.message))
    }
}