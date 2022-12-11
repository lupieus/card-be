const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');
   
app.use(bodyParser.json());
  
var cors = require('cors');
app.use(cors());


var storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'uploads');
   },
   filename: function (req, file, cb) {
      cb(null, "front.jpg");
   }
});
var uploadFront = multer({ storage: storage });
   

var storageback = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'uploads');
   },
   filename: function (req, file, cb) {
      cb(null, "back.jpg");
   }
});
var uploadback = multer({ storage: storageback });
/**
 * Create New Item
 *
 * @return response()
 */
 app.use(express.static('public')); 
 app.use('/uploads', express.static('uploads'));

app.post('/api/image-upload-front', uploadFront.single('imageFront'),(req, res) => {
 
  const imageFront = req.imageFront;
    res.send(apiResponse({message: 'File uploaded successfully.', imageFront}));
});

app.post('/api/image-upload-back', uploadback.single('imageBack'),(req, res) => {
 
   const imageBack = req.imageBack;
     res.send(apiResponse({message: 'File uploaded successfully.', imageBack}));
 });
/**
 * API Response
 *
 * @return response()
 */
function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
