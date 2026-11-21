const express = require('express')
const Routers = require('./routers')

const factoryRouter = express.Router()

Routers.forEach((router) => {
    const { methods, middleware, handler, routerPath } = router
    const readMiddleware = router.readPublic ? [] : [middleware.auth, middleware.check]
    const writeMiddleware = [middleware.auth, middleware.check]

    if (methods.get && handler.getAll)
        factoryRouter.get(routerPath, ...readMiddleware, handler.getAll)

    if (methods.getOne && handler.getOne) {
        const oneMiddleware = router.ownRead
            ? [middleware.auth, middleware.own]
            : [middleware.auth, middleware.check]
        factoryRouter.get(`${routerPath}/:id`, ...oneMiddleware, handler.getOne)
    }

    if (methods.post && handler.post)
        factoryRouter.post(routerPath, ...writeMiddleware, handler.post)

    if (methods.put && handler.put)
        factoryRouter.put(`${routerPath}/:id`, ...writeMiddleware, handler.put)

    if (methods.patch && handler.patch)
        factoryRouter.patch(`${routerPath}/:id`, ...writeMiddleware, handler.patch)

    if (methods.delete && handler.delete)
        factoryRouter.delete(`${routerPath}/:id`, ...writeMiddleware, handler.delete)
})

module.exports = factoryRouter
