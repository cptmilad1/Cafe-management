const Routers = require("./routers");
const url = require("url");

routerFactory = (route) => {
    Routers.forEach((router) => {
        if (url.method === 'GET') {
            route.get(router.routerPath, router?.middleware, router.handler);
        }
    });
    return Routers
}