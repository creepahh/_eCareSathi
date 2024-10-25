const nodemailer = require('nodemailer');

router.post('/updateStatus', async (req, res) => {
    const { action, childName } = req.body;

    // Fetch parent's email based on childName from your database
    const parentEmail = await getParentEmailByChildName(childName);

    // Send email notification to parent
    if (parentEmail) {
        const transporter = nodemailer.createTransport({
            // Configure your email service
        });

        const mailOptions = {
            from: 'your-email@example.com',
            to: parentEmail,
            subject: 'Child Status Update',
            text: `The rider has ${action === 'pickup' ? 'picked up' : 'dropped off'} ${childName}.`,
        };

        await transporter.sendMail(mailOptions);
    }

    // Optionally, you can send a web alert back to the rider
    res.send('Status updated and parent notified!');
});

router.patch('/:id/status', async (req, res) => {
    try {
        const rider = await Rider.findByIdAndUpdate(req.params.id, { pickupDropStatus: req.body.status }, { new: true });
        if (!rider) return res.status(404).send();
        res.send(rider);
    } catch (error) {
        res.status(400).send(error);
    }
});

setInterval(async () => {
    const response = await fetch('/fetchNotifications');
    const notifications = await response.json();
    const notificationList = document.getElementById('notification-list');
    
    notifications.forEach(notification => {
        const li = document.createElement('li');
        li.textContent = notification.message; // Assuming notification has a 'message' property
        notificationList.appendChild(li);
    });
}, 5000); // Check every 5 seconds
