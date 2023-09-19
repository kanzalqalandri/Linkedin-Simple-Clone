const notification=require('./notificationModel');
const userModel=require('../user/userModel');
const userService=require('../user/userService');

module.exports.getNotifications = async (req, res) => {
    try {
      const userEmail = userService.email; 
      
      const user = await userModel.findOne({ email: userEmail });
      if (!user) {
        throw new Error('User not found.');
      }
      
      const userId = user._id;
  
      const notifications = await notification.find({ userId }).sort({ createdAt: -1 }).exec();
      console.log(notifications); 
      res.status(200).json(notifications);
    } catch (error) {
      console.error('Error retrieving notifications:', error);
      res.status(500).json({ message: 'Error retrieving notifications' });
    }
  };