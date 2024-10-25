const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

module.exports = function({ users, scheduledPickups, sendNotification }) {

    // Route to render the pickup scheduling page
    router.get('/', (req, res) => {
        res.render('pickup', { users }); // Render the pickup scheduling view
    });

    // Route to schedule a pickup
    router.post('/schedule-pickup', [
        body('parentId').isInt().withMessage('Parent ID must be an integer'),
        body('riderId').isInt().withMessage('Rider ID must be an integer'),
        body('pickupTime').isISO8601().withMessage('Pickup time must be a valid date'),
        body('dropoffTime').isISO8601().withMessage('Drop-off time must be a valid date')
    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { parentId, riderId, pickupTime, dropoffTime } = req.body;

        const pickup = {
            pickupId: scheduledPickups.length + 1,
            parentId: parseInt(parentId),
            riderId: parseInt(riderId),
            pickupTime,
            dropoffTime,
            status: 'Scheduled'
        };

        scheduledPickups.push(pickup);
        sendNotification(riderId, `Pickup scheduled for ${pickupTime}`);
        res.redirect('/scheduled-pickups'); // Redirect to the scheduled pickups view
    });

    // Route to mark a pickup as completed
    router.post('/pickup-completed', (req, res) => {
        const { pickupId } = req.body;
        const pickup = scheduledPickups.find(p => p.pickupId === parseInt(pickupId));

        if (pickup) {
            pickup.status = 'PickedUp'; // Update status
            sendNotification(pickup.parentId, `Your child has been picked up at ${pickup.pickupTime}`);
            res.redirect('/scheduled-pickups'); // Redirect to the scheduled pickups view
        } else {
            res.status(404).send('Pickup not found');
        }
    });

    // Route to mark a drop-off as completed
    router.post('/dropoff-completed', (req, res) => {
        const { pickupId } = req.body;
        const pickup = scheduledPickups.find(p => p.pickupId === parseInt(pickupId));

        if (pickup) {
            pickup.status = 'DroppedOff'; // Update status
            sendNotification(pickup.parentId, `Your child has been dropped off`);
            res.redirect('/scheduled-pickups'); // Redirect to the scheduled pickups view
        } else {
            res.status(404).send('Pickup not found');
        }
    });

    return router; 
};
