import { Request, Response, NextFunction } from 'express'

const USER = process.env.ADMIN_USER || 'admin'
const PASS = process.env.ADMIN_PASS || 'admin'

export function basicAuth(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization

    if (!header || !header.startsWith('Basic ')) {
        res.setHeader('WWW-Authenticate', 'Basic')
        return res.status(401).end()
    }

    const decoded = Buffer.from(
        header.replace('Basic ', ''),
        'base64',
    ).toString()

    const [user, pass] = decoded.split(':')

    if (user !== USER || pass !== PASS) {
        return res.status(401).end()
    }

    next()
}
