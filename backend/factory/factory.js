const express = require('express')
const Routers = require('./routers')

const factoryRouter = express.Router()

function emitEvent(req, event, payload) {
  const io = req.app.get('io')
  if (io) {
    io.to('cafe').emit(event, { table: payload.table, data: payload.data, action: payload.action })
  }
}

Routers.forEach((router) => {
  const { methods, middleware, handler, routerPath } = router
  const readMiddleware = router.readPublic ? [] : [middleware.auth, middleware.check]
  const writeMiddleware = [middleware.auth, middleware.check]

  const withEmit = (fn, action) => async (req, res, next) => {
    try {
      const result = await fn(req, res, next)
      emitEvent(req, `cafe:${action}`, {
        table: router.tableName,
        data: result,
        action,
      })
      return result
    } catch (err) {
      next(err)
    }
  }

  if (methods.get && handler.getAll)
    factoryRouter.get(routerPath, ...readMiddleware, handler.getAll)

  if (methods.getOne && handler.getOne) {
    const oneMiddleware = router.ownRead
      ? [middleware.auth, middleware.own]
      : [middleware.auth, middleware.check]
    factoryRouter.get(`${routerPath}/:id`, ...oneMiddleware, handler.getOne)
  }

  if (methods.post && handler.post)
    factoryRouter.post(routerPath, ...writeMiddleware, withEmit(handler.post, 'created'))

  if (methods.put && handler.put)
    factoryRouter.put(`${routerPath}/:id`, ...writeMiddleware, withEmit(handler.put, 'updated'))

  if (methods.patch && handler.patch)
    factoryRouter.patch(`${routerPath}/:id`, ...writeMiddleware, withEmit(handler.patch, 'patched'))

  if (methods.delete && handler.delete)
    factoryRouter.delete(`${routerPath}/:id`, ...writeMiddleware, withEmit(handler.delete, 'deleted'))
})

module.exports = factoryRouter
