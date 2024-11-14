const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Registration
/**
 * @swagger
 * /api/auth/register:
 *  post:
 *    summary: Register a new user
 *    description: Registers a user with a username and password. Password must be at least 8 characters long.
 *    tags:
 *      - Users
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                description: The user's unique username
 *              password:
 *                type: string
 *                description: The user's password (minimum 8 characters)
 *    responses:
 *      201:
 *        description: User registered successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                  description: The user's ID
 *                username:
 *                  type: string
 *                  description: The registered username
 *                token:
 *                  type: string
 *                  description: Authentication token for the user
 *      400:
 *        description: Bad request, either username is missing or user already exists, or password is invalid
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: The error message
 */

router.post("/register", authController.registerUser);

// Login
/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: Login a user
 *    description: Authenticates a user with username and password, and returns a token if credentials are valid.
 *    tags:
 *      - Users
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                description: The user's username
 *              password:
 *                type: string
 *                description: The user's password
 *    responses:
 *      200:
 *        description: User authenticated successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                  description: The user's ID
 *                username:
 *                  type: string
 *                  description: The authenticated user's username
 *                token:
 *                  type: string
 *                  description: Authentication token for the user
 *      400:
 *        description: Bad request, missing username or password
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: The error message
 *      401:
 *        description: Invalid credentials
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: The error message
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: The error message
 */

router.post("/login", authController.loginUser);

// Get current user profile
/**
 * @swagger
 * /api/auth/me:
 *  get:
 *    summary: Get current logged-in user's data
 *    description: Retrieves the authenticated user's information excluding the password. Requires a valid JWT token in the Authorization header.
 *    tags:
 *      - Users
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Successfully retrieved user data
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                  description: The user's ID
 *                username:
 *                  type: string
 *                  description: The authenticated user's username
 *                email:
 *                  type: string
 *                  description: The user's email
 *      400:
 *        description: Invalid user data
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: The error message
 */

router.get("/me", authMiddleware, authController.getMe);

module.exports = router;
