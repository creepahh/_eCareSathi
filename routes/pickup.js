const express = require('express');
const router = express.Router();

// Sample data for pickup and drop-off details (you can replace this with dynamic data from a database)
const pickupDetails = [
    {
        parentName: "John Doe",
        childName: "Emily Doe",
        pickupTime: "08:00 AM",
        dropTime: "04:00 PM",
        homeworkStatus: "Completed",
        assistedBy: "Teacher A"
    },
    {
        parentName: "Jane Smith",
        childName: "Michael Smith",
        pickupTime: "08:30 AM",
        dropTime: "04:30 PM",
        homeworkStatus: "Not Completed",
        assistedBy: "Teacher B"
    }
];

// Route to display pickup and drop-off details
router.get('/', (req, res) => {
    res.render('pickup', { pickupDetails: pickupDetails });
});

module.exports = router;
