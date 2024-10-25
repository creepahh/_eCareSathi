// const express = require('express');
// const router = express.Router();

// module.exports = function({ users, scheduledPickups, sendNotification }) {
    
//     // Route to render the main scheduling page
//     router.get('/', (req, res) => {
//         res.render('index', { users });
//     });

//     // Route to schedule a pickup
//     router.post('/schedule-pickup', (req, res) => {
//         const { parentId, riderId, pickupTime, dropoffTime } = req.body;

//         const pickup = {
//             pickupId: scheduledPickups.length + 1,
//             parentId: parseInt(parentId),
//             riderId: parseInt(riderId),
//             pickupTime,
//             dropoffTime,
//             status: 'Scheduled'
//         };

//         scheduledPickups.push(pickup);
//         sendNotification(riderId, `Pickup scheduled for ${pickupTime}`);
//         res.redirect('/');
//     });

//     // Route to mark a pickup as completed
//     router.post('/pickup-completed', (req, res) => {
//         const { pickupId } = req.body;
//         const pickup = scheduledPickups.find(p => p.pickupId === parseInt(pickupId));
        
//         if (pickup) {
//             pickup.status = 'PickedUp';
//             sendNotification(pickup.parentId, `Your child has been picked up at ${pickup.pickupTime}`);
//             res.redirect('/');
//         } else {
//             res.status(404).send('Pickup not found');
//         }
//     });

//     // Route to mark a drop-off as completed
//     router.post('/dropoff-completed', (req, res) => {
//         const { pickupId } = req.body;
//         const pickup = scheduledPickups.find(p => p.pickupId === parseInt(pickupId));
        
//         if (pickup) {
//             pickup.status = 'DroppedOff';
//             sendNotification(pickup.parentId, `Your child has been dropped off`);
//             sendNotification(1, `Child has been dropped off`); // Assuming caregiver ID is 1
//             res.redirect('/');
//         } else {
//             res.status(404).send('Pickup not found');
//         }
//     });

//     // Route to view notifications for all users
//     router.get('/notifications', (req, res) => {
//         res.render('notifications', { users });
//     });

//     return router;
// };
