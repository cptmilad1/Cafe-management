import { addPayment, deletePayment, editPayment, getOnePayment, getPayment } from '../controls/paymentsOption'

const Nexter =        require('../middlewares/nexter')
const Authenticator = require('../auth/middleware/authenticate')
const OwnerShip =     require('../auth/middleware/ownerShip')
const CheckRole =     require('../auth/middleware/roleChecker')

const {getUsers, editUser, deleteUser, profile} =                                                              require('../controls/usersOption')
const {getAllCategories, editCategory, deleteCtegory, addCategory, categotyFilter} =                           require('../controls/categoryOptions')
const {addOrderItems, editOrderItems, getOneOrderItems, patchOrderItems, getAllOrderItems, deleteOrderItems} = require('../controls/orderItems')
const {editOrder, getOrders, patchOrder, getOneOrder, deleteOrders} =                                          require('../controls/orderOptions')
const {getAllProducts, getOneProduct, addProduct, editProduct, deleteProduct} =                                require('../controls/productOptions')
const {getTables, editTable, addTable, deleteTable, changeTableStatus} =                                       require('../controls/tablesOption')


const Routers = [
    {tableName : "users",       routerPath: "/users",       methods: {get: true, getOne: true,  post: false, put: true, delete: true, patch: false},   middleware: {auth: Authenticator, own: OwnerShip, check: CheckRole, next: Nexter},  handler: {getAll: getUsers,           put: editUser,          delete: deleteUser,         getOne: profile}},
    {tableName : "categories",  routerPath: "/categories",  methods: {get: true, getOne: true,  post: true,  put: true, delete: true, patch: false},   middleware: {auth: Authenticator, own: OwnerShip, check: CheckRole, next: Nexter},  handler: {getAll: getAllCategories,   put: editCategory,      delete: deleteCtegory,      getOne: categotyFilter,     post: addCategory}},
    {tableName : "products",    routerPath: "/products",    methods: {get: true, getOne: true,  post: true,  put: true, delete: true, patch: false},   middleware: {auth: Authenticator, own: OwnerShip, check: CheckRole, next: Nexter},  handler: {getAll: getAllProducts,     put: editProduct,       delete: deleteProduct,      getOne: getOneProduct,      post: addProduct}},
    {tableName : "orders",      routerPath: "/orders",      methods: {get: true, getOne: true,  post: false, put: true, delete: true, patch: true},    middleware: {auth: Authenticator, own: OwnerShip, check: CheckRole, next: Nexter},  handler: {getAll: getOrders,          put: editOrder,         delete: deleteOrders,       getOne: getOneOrder,                             patch: patchOrder}},
    {tableName : "order_items", routerPath: "/order_items", methods: {get: true, getOne: true,  post: true,  put: true, delete: true, patch: true},    middleware: {auth: Authenticator, own: OwnerShip, check: CheckRole, next: Nexter},  handler: {getAll: getAllOrderItems,   put: editOrderItems,    delete: deleteOrderItems,   getOne: getOneOrderItems,   post: addOrderItems, patch: patchOrderItems}},
    {tableName : "tables",      routerPath: "/tables",      methods: {get: true, getOne: false, post: true,  put: true, delete: true, patch: true},    middleware: {auth: Authenticator, own: OwnerShip, check: CheckRole, next: Nexter},  handler: {getAll: getTables,          put: editTable,         delete: deleteTable,                                    post: addTable,      patch: changeTableStatus}},
    {tableName : "payments",    routerPath: "/payments",    methods: {get: true, getOne: true,  post: true,  put: true, delete: true, patch: true},    middleware: {auth: Authenticator, own: OwnerShip, check: CheckRole, next: Nexter},  handler: {getAll: getPayment,         put: editPayment,       delete: deletePayment,      getOne:getOnePayment,       post: addPayment}}
]
export default Routers;