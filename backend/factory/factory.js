const express = require('express')
const factoryRouter = express.Router()
const Routers = require("./routers");
const url = require("url");


    Routers.forEach((router) => {
        if (router.method.get) {
            if(url.pathname.includes('users') || url.pathname.includes('payments') || url.pathname.includes('orders') || url.pathname.includes('order-items')){
                factoryRouter.get(router.routerPath, router.middleware.auth, router.middleware.check, router.handler.getAll)
            }else{
                factoryRouter.get(router.routerPath, router.handler.getAll)
            }
        }
        if(router.method.getOne){
            if(url.pathname.includes('users')){
                factoryRouter.get(router.routerPath + "/:id",    router.middleware.auth, router.middleware.own, router.handler.getOne)
            }else{
                factoryRouter.get(router.routerPath + "/:id",    router.middleware.auth, router.middleware.check, router.handler.getOne)
            }
        }
        if(router.method.post){
            factoryRouter.post(  router.routerPath,          router.middleware.auth, router.middleware.check, router.handler.post)
        }
        if(router.method.delete){
            factoryRouter.delete(router.routerPath + '/:id', router.middleware.auth, router.middleware.check, router.handler.delete)
        }
        if(router.method.put){
            factoryRouter.put(   router.routerPath + "/:id", router.middleware.auth, router.middleware.check, router.handler.put)
        }
        if(router.method.patch){
            factoryRouter.patch( router.routerPath + "/:id", router.middleware.auth, router.middleware.check, router.handler.patch)
        }
    });
module.exports = factoryRouter