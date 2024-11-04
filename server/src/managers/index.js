import UsersManagers from "./mongo/UsersManagers.js";  // percistencia Mongo
export const usersService = new UsersManagers(); // percistencia Mongo

import ProductsManagers from "./mongo/ProductsManagers.js";  // percistencia Mongo
export const productsService = new ProductsManagers(); // percistencia Mongo

