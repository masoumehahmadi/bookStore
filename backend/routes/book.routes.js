const express = require("express");
const router = express.Router();

const bookController = require("../controllers/book.controller.js");
const authMiddleware = require("../middleware/auth.middleware");

// Public routes - no authentication needed
/**
 * @swagger
 * /api/books:
 *  get:
 *    summary: Get a list of all books
 *    description: Retrieves all books from the database along with their associated authors. Optionally supports filtering or sorting.
 *    tags:
 *      - Books
 *    responses:
 *      200:
 *        description: Successfully retrieved the list of books
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: Indicates the operation was successful
 *                count:
 *                  type: integer
 *                  description: The number of books retrieved
 *                data:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      _id:
 *                        type: string
 *                        description: The book ID
 *                      title:
 *                        type: string
 *                        description: The book's title
 *                      author:
 *                        type: object
 *                        properties:
 *                          _id:
 *                            type: string
 *                            description: The author's ID
 *                          name:
 *                            type: string
 *                            description: The author's name
 *                      publishedDate:
 *                        type: string
 *                        format: date
 *
 *                        description: The date the book was published
 *      400:
 *        description: Bad request or invalid data
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Error message
 */

router.get("/", bookController.getBooks);
/**
 * @swagger
 * /books/{id}:
 *  get:
 *    summary: Get a single book by ID
 *    description: Retrieves a single book from the database using the book's ID.
 *    tags:
 *      - Books
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The unique identifier of the book
 *    responses:
 *      200:
 *        description: Successfully retrieved the book
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: Indicates the operation was successful
 *                data:
 *                  type: object
 *                  properties:
 *                    _id:
 *                      type: string
 *                      description: The book's ID
 *                    title:
 *                      type: string
 *                      description: The book's title
 *                    author:
 *                      type: string
 *                      description: The book's author ID
 *                    publishedDate:
 *                      type: string
 *                      format: date
 *                      description: The date the book was published
 *      404:
 *        description: Book not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                message:
 *                  type: string
 *                  description: Error message indicating the book was not found
 *      400:
 *        description: Invalid request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Error message
 */

router.get("/:id", bookController.getBook);

// Protected routes - require authentication
router.use(authMiddleware); // Middleware to protect subsequent routes

/**
 * @swagger
 * /books:
 *  post:
 *    summary: Create a new book
 *    description: Adds a new book to the database. Requires authentication. The request body must contain at least a book title.
 *    tags:
 *      - Books
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - title
 *            properties:
 *              title:
 *                type: string
 *                description: The title of the book
 *              isbn:
 *                type: string
 *                description: The isbn of the book
 *              author:
 *                type: string
 *                description: The ID of the author
 *              publishedDate:
 *                type: string
 *                format: date
 *                description: The date the book was published
 *    responses:
 *      201:
 *        description: Book created successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: Indicates the book was created successfully
 *                data:
 *                  type: object
 *                  properties:
 *                    _id:
 *                      type: string
 *                      description: The created book's ID
 *                    title:
 *                      type: string
 *                      description: The title of the created book
 *      400:
 *        description: Validation error or bad request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                message:
 *                  type: string
 *                  description: Error message indicating what went wrong
 *                errors:
 *                  type: object
 *                  description: Detailed validation errors
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Internal server error message
 */
router.post("/", bookController.createBook);
/**
 * @swagger
 * /books/{id}:
 *  put:
 *    summary: Update an existing book
 *    description: Updates the details of an existing book using its ID. Requires authentication and validates the input.
 *    tags:
 *      - Books
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The unique identifier of the book
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                description: The title of the book
 *              isbn:
 *                type: string
 *                description: The isbn of the book
 *              author:
 *                type: string
 *                description: The ID of the author
 *              publishedDate:
 *                type: string
 *                format: date
 *                description: The date the book was published
 *    responses:
 *      200:
 *        description: Successfully updated the book
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: Indicates the book was updated successfully
 *                data:
 *                  type: object
 *                  properties:
 *                    _id:
 *                      type: string
 *                      description: The updated book's ID
 *                    title:
 *                      type: string
 *                      description: The updated title of the book
 *                    author:
 *                      type: string
 *                      description: The updated author ID
 *                    publishedDate:
 *                      type: string
 *                      format: date
 *                      description: The updated published date of the book
 *      404:
 *        description: Book not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                message:
 *                  type: string
 *                  description: Error message indicating the book was not found
 *      400:
 *        description: Invalid request or validation error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                message:
 *                  type: string
 *                  description: Error message indicating the request was invalid
 */
router.put("/:id", bookController.updateBook);
/**
 * @swagger
 * /books/{id}:
 *  delete:
 *    summary: Delete a book
 *    description: Deletes a book from the database using its ID. Requires authentication.
 *    tags:
 *      - Books
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The unique identifier of the book
 *    responses:
 *      200:
 *        description: Successfully deleted the book
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: Indicates the book was deleted successfully
 *                message:
 *                  type: string
 *                  description: Confirmation message indicating the book has been deleted
 *      404:
 *        description: Book not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                message:
 *                  type: string
 *                  description: Error message indicating the book was not found
 *      400:
 *        description: Invalid request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Internal server error message
 */
router.delete("/:id", bookController.deleteBook);

module.exports = router;
