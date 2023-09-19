const express= require('express')
const app=express()
const mongoose= require('mongoose');
mongoose.set('strictQuery', false);
var postModel = require('./src/post/postModel.js');
const cleanNotificationJob = require('./cleanNotificationJob');
//const mongoURI = "mongodb://localhost:27017/";
const multer = require('multer');
//const Minio = require('minio');

const routes = require('./route/routes');

const cors=require('cors');

const ps=require('./src/post/postService.js')

//app.use(cors());

app.use(cors({
    origin: "http://localhost:4200"
  }));



  // const minioClient = new Minio.Client({
  //   endPoint: 'localhost',
  //   port: 9000,
  //   useSSL: false,
  //   accessKey: 'HhRbbN5b3cy1SAIDBy4M',
  //   secretKey: 'wAjUSc3XCcd4N2CPMGQZLWlFRNOX0Bo2Dt2IIOyW',
  // });

 const uploadedImages = [];

  app.use(express.json());
// const upload = multer({ dest: 'uploads/' });



// app.post('/api/v1/images/upload', upload.single('image'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No image file found.');
//   }

//   const filePath = req.file.path;
//   const metaData = {
//     'Content-Type': req.file.mimetype,
//   };

//   const bucketName = 'picture'; 
//   const objectName = req.file.originalname;
//   const imageName = req.file.originalname; // Save the image name

//   minioClient.fPutObject(bucketName, objectName, filePath, metaData, async (err, etag) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).send('Error uploading the image.');
//     }

//     console.log('Image uploaded successfully: ' + objectName);

//     // Save the image name and object name association in the array
//     uploadedImages.push({ imageName, objectName });

    
//     const postModelData = new postModel({
//       username:ps.uname,
//       content:ps.con,
//       image:imageName,
//     });

//     console.log(imageName);

//     const result = await postModelData.save();

//     return res.status(200).send('Image uploaded successfully.');


//     //return res.status(200).json({ obj: {imageName, objectName}, msg: "my name"})
//   });
// });




  
  // Storage configuration using Multer
  // const storage = multer.memoryStorage();
  // const upload = multer({ storage: storage }).single('image');


  // app.post('/upload', upload, (req, res) => {
  //   if (!req.file) {
  //     return res.status(400).json({ error: 'No file selected.' });
  //   }
  
  //   const metaData = {
  //     'Content-Type': req.file.mimetype,
  //   };
  
  //   const bucketName = 'picture';
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



  // app.get('/photo/:filename', (req, res) => {
  //   const bucketName = 'picture';
  //   const objectName = req.params.filename;
  
  //   minioClient.getObject(bucketName, objectName, (err, dataStream) => {
  //     if (err) {
  //       console.error('Error fetching photo:', err);
  //       return res.status(500).json({ error: 'Error fetching photo.' });
  //     }
  
  //     dataStream.pipe(res);
  //   });
  // });



  // app.get('/api/v1/images/:imageName', (req, res) => {
  //   const { imageName } = req.params;
  
  //   // Find the corresponding object name in the array
  //   const uploadedImage = uploadedImages.find(img => img.imageName === imageName);
  
  //   if (!uploadedImage) {
  //     return res.status(404).send('Image not found.');
  //   }
  
  //   const bucketName = 'picture'; // Replace with your desired bucket name
  //   const objectName = uploadedImage.objectName;
  
  //   minioClient.getObject(bucketName, objectName, (err, dataStream) => {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).send('Error retrieving the image.');
  //     }
  
  //     // Pipe the data stream to the response to serve the image
  //     dataStream.pipe(res);
  //   });
  
  // });
  
  



app.listen((3005), function check(error)
{
 if (error)
    {
        console.log("Error............");
        
    }

   else
   {
    cleanNotificationJob();
    console.log("Success........");
   } 
}
)



//database connection

const connectDB = require('./config/db')
connectDB();





// mongoose.connect("mongodb://localhost:27017/", {useNewUrlParser: true, useUnifiedTopology: true},
// function checkDb(error) {
//     if(error)
//     {
//         console.log("Error in Db............");
//     }
//     else
//     {
//         console.log("Success in DB........");
//     }
// })

app.use(express.json());
//change
//app.use('/routes',routes);
//app.use(cors);

app.use("/",routes);






//http://127.0.0.1:9001/buckets