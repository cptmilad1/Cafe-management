const Routers = [
    {tableName : "users", routerPath: "/users", methods: ["GET", "POST", "PUT", "DELETE"], middleware: ["auth"], handler: ["getUser", "createUser", "updateUser", "deleteUser"]},
    {tableName : "categories", routerPath: "/categories", methods: ["GET", "POST", "PUT", "DELETE"], middleware: ["auth"], handler: ["getCategory", "createCategory", "updateCategory", "deleteCategory"]},
    {tableName : "products", routerPath: "/products", methods: ["GET", "POST", "PUT", "DELETE"], middleware: ["auth"], handler: ["getProduct", "createProduct", "updateProduct", "deleteProduct"]},
    {tableName : "orders", routerPath: "/orders", methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], middleware: ["auth"], handler: ["getOrder", "createOrder", "updateOrder", "deleteOrder", "patchOrder"]},
    {tableName : "order_items", routerPath: "/order_items", methods: ["GET", "POST", "PUT", "DELETE"], middleware: ["auth"], handler: ["getOrderItem", "createOrderItem", "updateOrderItem", "deleteOrderItem"]},
    {tableName : "tables", routerPath: "/tables", methods: ["GET", "POST", "PUT", "DELETE"]},
    {tableName : "payments", routerPath: "/payments", methods: ["GET", "POST", "PUT", "DELETE"]}
]
export default Routers;