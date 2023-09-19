const cron = require('node-cron');
const Notification = require('./src/notification/notificationModel');

  function scheduleNotificationCleanupJob() {
    cron.schedule('*/30 * * * * *', async () => { 
      try {
        const oneHourAgo = new Date();
        oneHourAgo.setSeconds(oneHourAgo.getSeconds() - 30);
        
        await Notification.deleteMany({ createdAt: { $lt: oneHourAgo } });
        console.log('Notification cleanup job completed.');
      } catch (error) {
        console.error('Error cleaning notifications:', error);
      }
    });
  }

module.exports = scheduleNotificationCleanupJob;