const Minio = require('minio');
const minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'HhRbbN5b3cy1SAIDBy4M',
    secretKey: 'wAjUSc3XCcd4N2CPMGQZLWlFRNOX0Bo2Dt2IIOyW',
  });

   //syntax 
  module.exports.minioClient = minioClient;

  //aaaaa