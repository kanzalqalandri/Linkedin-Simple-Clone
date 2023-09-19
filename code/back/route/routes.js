var express=require("express");
var userController=require("../src/user/userController");
var postController=require("../src/post/postController");
const router=express.Router();
const imageController=require('../src/post/imageController');
const notificationController = require('../src/notification/notificationController');
const multer=require('multer');
//const upload=multer ({dest:uploads})
const upload = multer({ dest: 'uploads/' });


// const Photo=require("../src/post/imageModel.js");
// const multer = require('multer');
// const minio = require('minio');

// const uploadedImages = [];


// // Set up Minio client
// const minioClient = new minio.Client({
//     endPoint: 'localhost',
//     port: 9000,
//     useSSL: false,
//     accessKey: 'HhRbbN5b3cy1SAIDBy4M',
//     secretKey: 'wAjUSc3XCcd4N2CPMGQZLWlFRNOX0Bo2Dt2IIOyW',
//   });



// // Set up Multer storage for photo uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + '-' + file.originalname);
//     },
//   });


//   const upload = multer({ storage: storage });  
  



//   // Route to handle photo upload
// router.post('/upload', upload.single('photo'), (req, res) => {

//     if (!req.file) {
//         return res.status(400).send('No image file found.');
//       }


//       const filePath = req.file.path;
//      const metaData = {
//     'Content-Type': req.file.mimetype,
//      };

//      const bucketName = 'picture'; // Replace with your desired bucket name
//      const objectName = req.file.originalname;
//      const imageName = req.file.originalname;


//      minioClient.fPutObject(bucketName, objectName, filePath, metaData, (err, etag) => {
//         if (err) {
//           console.log(err);
//           return res.status(500).send('Error uploading the image.');
//         }
    
//         console.log('Image uploaded successfully: ' + objectName);
    
//         // Save the image name and object name association in the array
//         uploadedImages.push({ imageName, objectName });
    
//         return res.status(200).send('Image uploaded successfully.');
//       });
    

//     const photo = new Photo({
//       name: req.file.originalname,
//       bucketName: 'picture',
//       minioObjectName: req.file.filename,
//     });
  
//     // Save the photo reference in MongoDB
//     photo.save((err) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).send('Failed to save photo reference to database.');
//       }
//       res.send('Photo uploaded and reference saved successfully.');
//     });
//   });

///////////////////


router.post('/create',userController.createUserControllerFn);

router.post('/login',userController.loginUserControllerFn);

//router.post('/post',  postController.createPost);
router.get('/', postController.getAllPosts);
router.post('/post',upload.single('image'),imageController.imageProcessing);
router.get('/image/:imageName',imageController.getImage);

router.get('/notifications', notificationController.getNotifications);

//change
// router.route('/user/login').post(userController.loginUserControllerFn);

// router.route('/user/create').post(userController.createUserControllerFn);



// router.route('/post/post').post( postController.createPost);
// router.route('/post').get( postController.getAllPosts);

//router.get('/', postController.getAllPosts);



//console.log('userController');

module.exports = router;
