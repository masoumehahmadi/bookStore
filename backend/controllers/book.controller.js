const asyncHandler = require('express-async-handler'); // For error handling
const Book = require('../models/book.model');
const logger = require('../utils/logger'); 
const { BadRequestError } = require('../utils/errorUtils');

// @desc    Get all books
// @route   GET /api/books
// @access  Public (For example, adjust based on authentication)
exports.getBooks = asyncHandler(async (req, res) => {
    const books = await Book.find({}).populate('author'); // Consider adding filtering/sorting 

    res.status(200).json({
        success: true,
        count: books.length,
        data: books,
    });
});

// @desc    Get a single book
// @route   GET /api/books/:id 
// @access  Public (Adjust based on authentication)
exports.getBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id); 

    if (!book) {
        res.status(404).json({
            success: false,
            message: 'Book not found',
        });
    }

    res.status(200).json({
        success: true,
        data: book,
    });
});

// @desc    Create new book
// @route   POST /api/books
// @access  Private (Protected by auth middleware)
exports.createBook = asyncHandler(async (req, res) => {
    try {
        if (!req.body.title) {
            throw new BadRequestError('Please provide a book title');
        }
        const book = await Book.create(req.body);
        res.status(201).json({ success: true, data: book });
        logger.info(`Book created successfully with ID: ${book._id}`);
    } catch (error) {
        if (error instanceof BadRequestError || error.name === 'ValidationError') {
            res.status(400).json({ 
                success: false, 
                message: 'Validation Error:',
                errors: error.errors // Provides detailed error info
            });
        } else {
            logger.error('Error creating book:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private (Protected by auth middleware)
exports.updateBook = asyncHandler(async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true, // Validate input again
    });

    if (!book) {
        res.status(404).json({
            success: false,
            message: 'Book not found',
        });
    }

    res.status(200).json({
        success: true,
        data: book,
    });
});

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private (Protected by auth middleware)
exports.deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
        res.status(404).json({
            success: false,
            message: 'Book not found',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Book deleted',
    });
});
