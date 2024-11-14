const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info', // Default log level 
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamp
        format.simple() // Basic string formatting 
    ),
    transports: [
        // Log to console (with colors for dev)
        new transports.Console({
            format: format.combine(
                format.colorize(), 
                format.simple()
            ),
        }),
        // Log to file for more persistence
        new transports.File({ filename: 'app.log' }),
    ],
});

module.exports = logger;
