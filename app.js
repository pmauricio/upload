var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser({
    keepExtensions: true,
    uploadDir: __dirname + '/public/images',
    limit: '2mb'
  }));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
  app.use(express.errorHandler());
});

// Routes

app.get('/', function (req, res) {
  console.log('file successfully deleted');

  //  res.render('gallery',);
  res.render('index', { data: getImages() });


});

app.post('/', function (req, res) {
  deleteAfterUpload(req.files.myFile.path);
  res.end();
});

// Start the app

http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));

});

// Private functions

var fs = require('fs');

var deleteAfterUpload = function (path) {
  setTimeout(function () {
    fs.unlink(path, function (err) {
      if (err) console.log(err);
      console.log('file successfully deleted');
    });
  }, 60 * 1000);
};

//get the list of jpg files in the image dir
function getImages()//, callback)
{

  var fs = require('fs'),
  files = [];
var contents = fs.readdirSync('public/images');
console.log(contents);

    for (i = 0; i < contents.length; i++) {

      console.log("reading dir: " + contents[i]);
      files.push('images/'+contents[i]); //store the file name into the array files

    }
    return files;
    //callback(err, files);
}