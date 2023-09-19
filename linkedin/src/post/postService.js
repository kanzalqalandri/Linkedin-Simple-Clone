var postModel = require('./postModel.js');
var userModel = require('../user/userModel.js');
//var userModel = require('./userModel.js');
var userService = require('../user/userService');
const imageProcessing=require('./imageController.js');
const Notification = require('../notification/notificationModel.js');


// const app1=express();

// const multer=require ('multer');
// const Minio=require('minio');

module.exports.postDBService = async (postDetails) => {
  try {
    const user = await userModel.findOne({ email: userService.email });
    console.log(userService.email);

    if (!user) {
      throw new Error("User not found.");
    }


    


    //new
    // const minioClient = new Minio.Client({
    //   endPoint: 'localhost',
    //   port: 9000,
    //   useSSL: false,
    //   accessKey: 'abcdefgh',
    //   secretKey: 'abcdefgh',
    // });

  //   const storage = multer.memoryStorage();
  //  const upload = multer({ storage: storage }).single('image');


  //  app1.post('/upload', upload, (req, res) => {
  //   if (!req.file) {
  //     return res.status(400).json({ error: 'No file selected.' });
  //   }
  
  //   const metaData = {
  //     'Content-Type': req.file.mimetype,
  //   };
  
  //   const bucketName = 'your-bucket-name';
  //   const objectName = req.file.originalname;
  
  //   minioClient.fPutObject(bucketName, objectName, req.file.buffer, metaData, (err, etag) => {
  //     if (err) {
  //       console.error('Error uploading image:', err);
  //       return res.status(500).json({ error: 'Error uploading image.' });
  //     }
  
  //     console.log('Image uploaded successfully. ETag:', etag);
  //     res.json({ message: 'Image uploaded successfully.' });
  //   });
  // });

  //new



    const postData ={
      username: user.firstname, // Use the firstname from the user table
      content: postDetails.content,
    };

    if(postDetails.image){
      postData.image = postDetails.image;
    }


    // module.exports.uname=user.firstname;
    // module.exports.con=postDetails.content;


    const postModelData=new postModel(postData);

     const result = await postModelData.save();


     const otherUsers = await userModel.find({ firstname: { $ne: user.firstname } });
     const message = `${user.firstname} has created a new post.`;

    const notifications = otherUsers.map((otherUser) => ({
      userId: otherUser._id,
      postId: result._id,
      message,
    }));

    await Notification.insertMany(notifications);

    console.log(result);
    return true;
  } catch (error) {
    console.error('Error in postDBService:', error);
    throw new Error('Error saving postModelData.');
}
};



module.exports.getPost = async (userEmail, res) => {
  try {
    const user = await userModel.findOne({ email: userEmail });
    if (!user) {
      throw new Error('User not found.');
    }

    // const loggedInUserPosts = await postModel
    //   .find({ username: user.firstname })
    //   .sort({ createdAt: -1 })
    //   .exec();

    const otherPosts = await postModel
      .find({ username: { $ne: user.firstname } })    //except  syntax
      .sort({ createdAt: -1 })
      .exec();

    // const loggedInUserPostsWithImages = await Promise.all(loggedInUserPosts.map(async (post) => {
    //   const imageUrl = post.image
    //     ? `http://127.0.0.1:8080/image/${post.image}`
    //     : null;

    //   return { ...post.toObject(), imageUrl };
    // }));

    const otherPostsWithImages = await Promise.all(otherPosts.map(async (post) => {
      const imageUrl = post.image
        ? `http://localhost:5001/image/${post.image}`
        : null;

      return { ...post.toObject(), imageUrl }; // syntax problem
    }));

    res.status(200).json({ otherPosts: otherPostsWithImages });
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ message: 'Error retrieving posts' });
  }
};




// module.exports.getPost = (userEmail,res) => {
//   postModel.find()
//     .then((posts) => {
//       res.status(200).json(posts);
//     })
//     .catch((error) => {
//       console.error('Error retrieving posts:', error);
//       res.status(500).json({ message: 'Error retrieving posts' });
//     });
// };