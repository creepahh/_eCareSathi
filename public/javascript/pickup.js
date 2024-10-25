// document.getElementById('scheduleForm').addEventListener('submit', async function (e) {
//     e.preventDefault();

//     const formData = new FormData(this);
//     const pickupData = {
//         pickupTime: formData.get('pickupTime'),
//         dropoffTime: formData.get('dropoffTime'),
//         homework: formData.get('homework'),
//         meals: formData.get('meals')
//     };

//     try {
//         const response = await fetch('/pickup/schedule', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(pickupData)
//         });

//         const result = await response.json();
//         if (result.success) {
//             alert('Pickup scheduled successfully!');
//         } else {
//             alert('Failed to schedule pickup.');
//         }
//     } catch (error) {
//         console.error('Error scheduling pickup:', error);
//     }
// });