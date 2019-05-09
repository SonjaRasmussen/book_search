const Book = require("./Book");
module.exports = db => ({Book: Book(db) });
