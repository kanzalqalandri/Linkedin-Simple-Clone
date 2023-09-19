# Distributive
This is a mini LinkedIn that represents basic operations such as Registration, Login, Creating posts, notify other users to see that posts.
Our target is to build a monolithic application then we will convert it into a microservices by using docker.

# Features
1. User Registration
2. User Login
3. Authenticating by Email
4. Making Post along with Image
5. Uploading & Showing images from Minio
6. Notification for newly created posts
7. Notification Cleaner (clean notification in every 60 minutes)

# Next Task
1. Divide the monolithic project into micro services. For this project three micro services will be created in backend.(we have to create 3 subfolders where the user,post, notification module will remain)
2. For each sub folder there will be separated docker file.
3. For all docker files there will be one docker compose and this docker compose will remain in root folder.
4. 3 different database should be created. for each database separated docker files
5. we need to run the frontend into PRODUCTION mode and run it from Nginx using the static files.

# Run Locally
1.Clone the project from here

https://github.com/Tasnia16/Distributive.git

2.Go to the project directory
cd linkedin

3.Install Minio in your linux machine. Then start the Minio server
sudo ./minio server /minio

4. Install MongoDB in local machine. Follow this official Documentation to install it. Check your mongodb is running in background
   sudo systemctl status mongod

5. If mongodb is not activated then run the following command
   sudo systemctl start mongod
6. To run backend
    cd backend
    npm i
    npm start  
    node server.js    

8. To run frontend
    cd front
    ng serve
   


