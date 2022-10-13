const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/users");
const {
  validateRegistrationUser,
  validateLoginUser,
} = require("../../validation/users");
// const guard = require("../../helpers/guard");
const limiter = require("../../helpers/reglimiter");


const {EmailService} = require("../../services/email");


/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         email:
 *           type: string
 *           description: The user email
 *         verificationToken:
 *           type: string
 *           description: The user token
 *         verify:
 *           type: booleon
 *           description: Is user is verify
 *       example:
 *         email: test@gmail.com
 */


router.get("/current", ctrl.getCurrent);
router.get("/verify/:token", ctrl.verifyUser);


/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         email:
 *           type: string
 *           description: The user email
 *         verificationToken:
 *           type: string
 *           description: The user token
 *         verify:
 *           type: booleon
 *           description: Is user is verify
 *       example:
 *         email: test@gmail.com
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The task managing API
 */
/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: successfully created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.post("/signup", limiter, validateRegistrationUser, ctrl.registration);


// router.post("/sendMail", async (req, res) => {
//   try {
//     const sent = await EmailService;
//     console.log(sent);
//     // const sent = true;
//     if (sent) {
//       res.send({ message: "email sent successfully" });
//     }
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

router.post("/sendMail", EmailService);
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfully login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.post("/login", validateLoginUser, ctrl.login);
router.post("/logout", ctrl.logout);

/**
 * @swagger
 * /user/verify/{verificationToken}:
 *   get:
 *     summary: Verify user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Verification successful
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.post("/verify", ctrl.repeatEmailVerify);

module.exports = router;
