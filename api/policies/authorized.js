/**
 * authorized
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  
  //log visits
  console.log('req.route.path: ', req.route.path)
  
  if (!req.session.user && req.route.path != '/login' && req.route.path != '/validateLogin')
	return res.redirect('/login')
	
	return next()

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
};
