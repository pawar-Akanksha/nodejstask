/**
 * @swagger
 * tags:
 *   name: Authorization
 *   description: User authorization middleware
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/authorize:
 *   get:
 *     summary: Test authorization middleware
 *     tags: [Authorization]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *         description: Role to check authorization against
 *     responses:
 *       200:
 *         description: Authorization successful
 *       401:
 *         description: Unauthorized - No token provided or invalid token
 *       403:
 *         description: Forbidden - User role not authorized
 */

const authorize = (roles) => {
  console.log("incoming=>",roles)
    return (req, res, next) => {
      console.log("admin started creating products=>",req.user.role)
      if (!roles.includes(req.user.role)) return res.sendStatus(403);
      next();
    };
  };
  
  
  module.exports = authorize;