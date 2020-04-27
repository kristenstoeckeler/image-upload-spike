// route/api/profile.js
const express = require( 'express' );
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

// Get express to create a Router
let router = express.Router();

//Pool config
const pg = require('pg');
const Pool = pg.Pool;
const pool = new Pool({
    database: 'image-upload-spike', //change this to match database in Postico
    host: 'localhost',          //where your DB is
    port: 5432,
    max: 10,                  //10 will service thousands of requests, this depends on demand on app
    idleTimeoutMillis: 30000    //30 second timout on idle queries                
})

pool.on('connect', () => {         //this is an event handler
    console.log('Database connection established...');
})

pool.on('error', (error) => {
    console.log('Database error:', error);
})


/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
 */
// const router = express.Router();/**
//  * PROFILE IMAGE STORING STARTS
//  */

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    Bucket: 'shuttlewpm'
});

/**
 * Single Upload
 */
const profileImgUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'shuttlewpm',
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
        }
    }),
    limits: { fileSize: 5000000 }, // In bytes: 5000000 bytes = 5 MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('profileImage');/**
 
//* Check File Type
// * @ param file
// * @ param cb
// * @ return {*}
// */

function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype); if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}/**

// * @ route POST api/profile/business-img-upload
// * @ desc Upload post image
// * @ access public
 */

router.post('/profile-img-upload', (req, res) => {
    console.log( 'made it to server!');
    
    profileImgUpload(req, res, (error) => {
        console.log( 'requestOkokok', req.file );

        if (error) {
            console.log('errors', error);
            res.json({ error: error });
        } else {
            // If File not found
            if (req.file === undefined) {
                console.log('Error: No File Selected!');
                res.json('Error: No File Selected');
            } else {
                // If Success
                const imageName = req.file.key;
                const imageLocation = req.file.location;// Save the file name into database into profile modelres.json

                const imageObject = {
                    name: imageName,
                    location: imageLocation
                }
                res.send(imageObject);
        }
    }
    
 });
});

router.post('/image', (req, res) => {
    console.log('server-side POST response', req.body);
    const image = req.body;
    const sqlText = `INSERT INTO "images" ("name", "location") VALUES ($1, $2)`;
    
    pool.query(sqlText, [image.name, image.location])
        .then((result) => {
            console.log('made it to DB', image);
            res.sendStatus(200);

        })
        .catch((error) => {
            console.log(`Error on POST query: ${error}`);
            res.sendStatus(500);
        })

});




// End of single profile upload/**
// We export the router so that the server.js file can pick it up
module.exports = router;