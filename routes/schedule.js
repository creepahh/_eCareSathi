const express = require('express');
const router = express.Router();
const Schedule = require('./models/schedule'); // Adjust the path as needed


// router.post('/update-status', async (req, res) => {
//     const { childName, newStatus } = req.body;
    
//     try {
//         const updatedSchedule = await Schedule.findOneAndUpdate(
//             { label: childName }, // Assuming 'label' is the unique identifier for the schedule
//             { status: newStatus },

            
//             { new: true } // Return the updated document
//         );

//         if (updatedSchedule) {
//             res.status(200).send('Status updated successfully!');
//         } else {
//             res.status(404).send('Schedule not found.');
//         }
//     } catch (error) {
//         res.status(500).send('Error updating status.');
//     }
// });
// console.log('Updating status for:', childName, 'to:', newStatus);


module.exports = router;
