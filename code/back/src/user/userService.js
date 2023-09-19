var userModel = require('./userModel.js');
var bcrypt=require('bcrypt');
var crypto1 = require('crypto');
var hashpass=crypto1.randomBytes(32).toString('hex');



module.exports.hashpass=hashpass;

//var key='123456789tryrtyr';
//var jwt = require('jwt-simple')
//var encryptor=require('simple-encryptor')(key);
module.exports.createUserDBService= async (userDetails, res) =>{


    const hash=await bcrypt.hash(userDetails.password,12);



    // return new Promise(function myFn(resolve, reject)
    // {

    const user = await userModel.findOne({ email: userDetails.email });
    if (user) {
        res.json({"status":false,"message":"user exists in the database"});
        //console.log("exiting");
    }

    else{
        res.send({"status":true,"message":"user created successfully"});
    console.log('in here you', userDetails);
       var userModelData = await new userModel({
        firstname: userDetails.firstname, 
        lastname: userDetails.lastname, 
        email: userDetails.email, 
        //password: userDetails.password, 
        password:hash
       });
       console.log(userModelData);

       await userModelData.save();
    }
     
}




module.exports.loginuserDBService = async (userDetails,res)=> 
{


    const user = await userModel.findOne({ email: userDetails.email });
    const isMatch = await bcrypt.compare(userDetails.password, user.password);

    const pass = await userModel.findOne({ password: userDetails.password });


    if (user && isMatch) {
        res.send({"status":true,"message":"hoise"});
        module.exports.email =userDetails.email;
        //console.log("exiting");
    }

    else{
        res.send({"status":false,"message":"hoy naaa"});

    }
   
    //   userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result)
    //   {
    //      if(errorvalue)
    //      {
    //        // reject({status: false, msg: "Invaild Data"});
    //        res.send({"status":false,"message":"Invaild Data"});
    //      }
    //      else
    //      {
    //         if(result !=undefined &&  result !=null)
    //         {
    //            var decrypted = encryptor.decrypt(result.password);
    //            if(decrypted== userDetails.password)
    //            {
    //              // resolve({status: true,msg: "Student Validated Successfully"});
    //              res.send({"status":true,"message":"user validated successfully"});
    //            }
    //            else
    //            {
    //               //reject({status: false,msg: "Student Validated failed"});
    //               res.send({"status":false,"message":"student Validated failed"});
    //            }
    //         }
    //         else
    //         {
    //            //reject({status: false,msg: "Student Error Detailssss"});
    //            res.send({"status":false,"message":"student Validated failed"});
    //         }
    //      }
      
    //   });
      
   
}
    

       
    // }
    // );



