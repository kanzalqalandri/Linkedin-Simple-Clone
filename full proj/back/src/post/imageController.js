const minioIntegration = require('../minIO/minIOIntegrate');
const minioClient=minioIntegration.minioClient;
const Post=require('./postService');





//app.post('/api/v1/images/upload', upload.single('image'), 



  module.exports.imageProcessing=(req, res) => {
    if (!req.file) {


        console.log(req.body);
        const postDetails = {
          content: req.body.content,
          image:'',
        };


         Post.postDBService(postDetails).then((status) => {

            if (status) {
                //res.send({ status: true, message: "post created successfully" });
                console.log("j");
              } else {
                console.log("createPost e shomossha");
               // res.send({ status: false, message: "Error creating post" });
              }
            
         }).catch((error) => {

            console.log(error);
         })
       // console.log(status);
    
        


      return res.status(400).send('No image file found.');



    }
  
    const filePath = req.file.path;
    const metaData = {
      'Content-Type': req.file.mimetype,
    };
  
    const bucketName = 'picture'; 
    const objectName = req.file.originalname;
    const imageName = req.file.originalname; // Save the image name
  
    minioClient.fPutObject(bucketName, objectName, filePath, metaData, async (err, etag) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error uploading the image.');
      }
  
      console.log('Image uploaded successfully: ' + objectName);
  
      // Save the image name and object name association in the array
     // uploadedImages.push({ imageName, objectName });

     ////    kaj
  
      
    //   const postModelData = new postModel({
    //     username:ps.uname,
    //     content:ps.con,
    //     image:imageName,
    //   });


       const postDetails = {

        content: req.body.content,
        image: imageName,
      };



      Post.postDBService(postDetails).then((status) => {

        if (status) {
           // res.send({ status: true, message: "post created successfully" });
           console.log("j2");
          } else {
            console.log("createPost e shomossha2");
           // res.send({ status: false, message: "Error creating post" });
          }
        
     }).catch((error) => {

        console.log(error);
     })

  
      console.log(imageName);
  
      //const result = await postModelData.save();
  
      return res.status(200).send('Image uploaded successfully.');
  
  
      //return res.status(200).json({ obj: {imageName, objectName}, msg: "my name"})
    });
  };

  module.exports.getImage=(req, res) => {


    const { imageName } = req.params;
  
    // Find the corresponding object name in the array
    // const uploadedImage = uploadedImages.find(img => img.imageName === imageName);
  
    // if (!uploadedImage) {
    //   return res.status(404).send('Image not found.');
    // }
  
    const bucketName = 'picture'; // Replace with your desired bucket name
    const objectName = imageName;
    //uploadedImage.objectName;
    module.exports.objectName = objectName;

    console.log(`Fetching image: ${imageName}`);
  
    minioClient.getObject(bucketName, imageName, (err, dataStream) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error retrieving the image.');
      }

      const contentType = getImageContentType(imageName);
      res.setHeader('Content-Type', contentType);
  
      // Pipe the data stream to the response to serve the image
      dataStream.pipe(res);
    });


  };
  
  function getImageContentType(imageName) {
    // Implement logic to determine the content type based on the image file extension
    // Example: Check the file extension and return the corresponding content type
    const fileExtension = imageName.split('.').pop().toLowerCase();
    switch (fileExtension) {
      case 'png':
        return 'image/png';
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'gif':
        return 'image/gif';
      // Add more cases as needed
      default:
        return 'application/octet-stream'; // Default to binary data
    }
  }
  