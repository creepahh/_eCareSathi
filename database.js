const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // In-memory database for demo

db.serialize(() => {
    // Create a table
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        child_name TEXT NOT NULL,
        parent_name TEXT NOT NULL,
        school_address TEXT NOT NULL,
        home_address TEXT NOT NULL,
        age INTEGER NOT NULL,
        school_name TEXT NOT NULL,
        hobbies TEXT NOT NULL
    )`);

    // Insert a sample user
    const stmt = db.prepare(`INSERT INTO users (child_name, parent_name, school_address, home_address, age, school_name, hobbies)
    VALUES (?, ?, ?, ?, ?, ?, ?)`);
    
    stmt.run('John Doe', 'Jane Doe', '123 School Rd', '456 Home St', 10, 'Elementary School', 'Reading');
    stmt.finalize();
});

module.exports = db; // Export the database connection
