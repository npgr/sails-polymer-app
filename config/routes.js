/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/
  'get /prueba/:id&:id2': 'MatheadsController.prueba',
  '/Matheads/edit/:matnr': 'MatheadsController.edit',
  '/Matheads/display/:matnr': 'MatheadsController.display',
  '/Matheads/delete/:matnr': 'MatheadsController.delete',
  /*'post /Matheads/destroy/:id?': 'MatheadsController.destroy',
  "post /Matheads/update/:matnr?": "MatheadsController.update",*/
  "/Matheads/exist/:matnr": "MatheadsController.exist",
  "post /Customer/destroy/:id?": "CustomerController.destroy",
  "post /Customer/update/:id?": "CustomerController.update",
  /*"post /Product/destroy/:id?": "ProductController.destroy",
  "post /Product/update/:?": "ProductController.update",*/
  "/Product/exist/:": "ProductController.exist",
  "/Category/exist/:id": "CategoryController.exist",
  "/Model/exist/:model": "ModelController.exist",
  "/Model/list": "ModelController.list",
  "post /ModelFunction/list": "ModelFunctionController.list",
  "post /ModelFunction/generate": "ModelFunctionController.generate",
  "post /FunctionList/generate": "FunctionListController.generate",
  "post /FunctionList/get": "FunctionListController.get",
  "post /Attribute/list": "AttributeController.list",
  "/Attribute/exist/:model": "AttributeController.exist",
  "get /Task": "TaskController.get",
  "post /Task": "TaskController.create",
  "/Task/list": "TaskController.list",
  "/Task/list2": "TaskController.list2", // For PageSpeed Analysis
  "/Task/dashboard": "TaskController.dashboard",
  "/Task/cube": "TaskController.cube",
  "/": "UserController.login",
  "/login": "UserController.login",
  "/signout": "UserController.signout",
  "post /validateLogin": "UserController.validateLogin",
  "/User/list": "UserController.list",
  "/Account/list": "AccountController.list",
  "/Profile/list": "ProfileController.list",
  "/Resource/list": "ResourceController.list",
  "/ProfileResource/list": "ProfileResourceController.list",
  "/Product/list": "ProductController.list",
  "/ProductCategory/list": "ProductCategoryController.list",
  "/ProductSubCategory/list": "ProductSubCategoryController.list",
  "/Supplier/list": "SupplierController.list",
  "/Country/list": "CountryController.list",
  "/State/list": "StateController.list",
  "/City/list": "CityController.list",
  "/Customer/list": "CustomerController.list",
  "/CustomerCategory/list": "CustomerCategoryController.list",
  "/Seller/list": "SellerController.list",
  "/Order/list": "OrderController.list",
  "post /OrderDetail/list": "OrderDetailController.list",
  "/Expense/list": "ExpenseController.list",
  "get /Expense": "ExpenseController.get",
  "/ExpenseCategory/list": "ExpenseCategoryController.list",
  "get /ExpenseCategory": "ExpenseCategoryController.get",
  "/ExpenseCategory/total": "ExpenseCategoryController.total",
  "/Expense/dashboard": "ExpenseController.dashboard",
  "/TicketCategory/list": "TicketCategoryController.list",
  "/Pacient/list": "PacientController.list",
  "get /Pacient": "PacientController.get",
  "post /PacientCard/list": "PacientCardController.list",
  "post /PacientHistory/list": "PacientHistoryController.list",
  "/Sales/Cube": "SalesController.Cube",
  "/Sales/byRegionCustCategory": "SalesController.byRegionCustCategory",
  "/Sales/byProdCategory": "SalesController.byProdCategory",
  "/SalesRegion/list": "SalesRegionController.list",
  "/Sales/Dashboard": "SalesController.Dashboard",
  "/Cotizacion": "CotizacionController.cotizar",
  
  "/Prueba3/list": "Prueba3Controller.list"
};
