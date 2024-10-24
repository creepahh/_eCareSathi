const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Retrieve parent and child data from query parameters
    const { parentName, childName, childAge, email } = req.query;

    // Render the home page with the parent and child information
    res.render('home', {
        parentName: parentName,
        childName: childName,
        childAge: childAge,
        email: email
    });
});

module.exports = router;
