# Blogs Referenced
https://medium.com/@fabianopb/upload-files-with-node-and-react-to-aws-s3-in-3-steps-fdaa8581f2bd

https://codeytek.com/course/upload-files-images-on-amazon-web-services-course/upload-files-images-on-amazon-web-services-content/files-images-on-amazon-web-services-aws-s3-react-node-js-create-bucket/

https://codeytek.com/course/upload-files-images-on-amazon-web-services-course/upload-files-images-on-amazon-web-services-content/file-uploads-on-amazon-web-services-aws-multer-s3-node-js-react-js-express-aws-sdk/

https://medium.com/@fabianopb/upload-files-with-node-and-react-to-aws-s3-in-3-steps-fdaa8581f2bd


# Video Tutorials Referenced
https://www.youtube.com/watch?v=XeiOnkEI7XI (thanks Erick)

https://www.youtube.com/watch?v=e-gb9IBfSw8


# AWS S3 SPIKE 

This is currently uploading an image to AWS S3. Ultimately I ended up working with the codeytek blog videos and code. The one major roadblock I ran into is that I had to change my bucket access to fully public. I'm not sure what kind of security risk this represents, but I'm assuming it is one. 

All the code for this is in the Home (client) and Profile (server) components. There is an ImageUploader component as well as code in server.js, which represents another attempt I made. I think it's solid client-side file-handling code, and I want to keep the corresponding server-side code for reference. This code came from the medium blog post above. 

I ran out of time, but the next step for this is to send the file name and file location to my database, so I have a pool module configured for this. 





