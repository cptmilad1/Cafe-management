const Nexter =        require('../middlewares/nexter')
const Authenticator = require('../auth/middleware/authenticate')
const OwnerShip =     require('../auth/middleware/ownerShip')
const CheckRole =     require('../auth/middleware/roleChecker')

const {getUsers, editUser, deleteUser, profile} =                                                              require('../controls/usersOption')
const {getAllCategories, editCategory, deleteCtegory, addCategory, categotyFilter} =                           require('../controls/categoryOptions')
const {addOrderItems, editOrderItems, getOneOrderItems, patchOrderItems, getAllOrderItems, deleteOrderItems} = require('../controls/orderItems')
const {addOrder, editOrder, getOrders, patchOrder, getOneOrder, deleteOrders} =                                require('../controls/orderOptions')
const {getAllProducts, getOneProduct, addProduct, editProduct, deleteProduct} =                                require('../controls/productOptions')
const {getTables, editTable, addTable, deleteTable, changeTableStatus} =                                       require('../controls/tablesOption')


const Routers = [
    {tableName : "users",       routerPath: "/users",       methods: ["GET", "POST", "PUT", "DELETE"],    middleware: [Authenticator, OwnerShip, CheckRole, Nexter],  handler: [getUsers, editUser, deleteUser, profile]},
    {tableName : "categories",  routerPath: "/categories",  methods: ["GET", "POST", "PUT", "DELETE"],    middleware: [Authenticator, OwnerShip, CheckRole, Nexter],  handler: [getAllCategories, editCategory, deleteCtegory, addCategory, categotyFilter]},
    {tableName : "products",    routerPath: "/products",    methods: ["GET", "POST", "PUT", "DELETE"],    middleware: [Authenticator, OwnerShip, CheckRole, Nexter],  handler: [getAllProducts, getOneProduct, addProduct, editProduct, deleteProduct]},
    {tableName : "orders",      routerPath: "/orders",      methods: ["GET", "POST", "PUT", "DELETE"],    middleware: [Authenticator, OwnerShip, CheckRole, Nexter],  handler: [getOrders, getOneOrder, addOrder, editOrder, deleteOrders, patchOrder]},
    {tableName : "order_items", routerPath: "/order_items", methods: ["GET", "POST", "PUT", "DELETE"],    middleware: [Authenticator, OwnerShip, CheckRole, Nexter],  handler: [getAllOrderItems, getOneOrderItems, addOrderItems, editOrderItems, deleteOrderItems, patchOrderItems]},
    {tableName : "tables",      routerPath: "/tables",      methods: ["GET", "POST", "PUT", "DELETE"],    middleware: [Authenticator, OwnerShip, CheckRole, Nexter],  handler: [getTables, addTable, editTable, deleteTable, changeTableStatus]},
    {tableName : "payments",    routerPath: "/payments",    methods: ["GET", "POST", "PUT", "DELETE"],    middleware: [Authenticator, OwnerShip, CheckRole, Nexter],  handler: []}
]
export default Routers;