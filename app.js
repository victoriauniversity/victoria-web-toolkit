'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var port = 1337;

/*
 * Use Handlebars for templating
 */
var exphbs = require('express-handlebars');
var hbs;

// For gzip compression
app.use(express.compress());

/*
 * Config for Production and Development
 */
if (process.env.NODE_ENV === 'production') {
    // Set the default layout and locate layouts and partials
    app.engine('handlebars', exphbs({
        defaultLayout: 'main',
        layoutsDir: 'dist/views/layouts/',
        partialsDir: [
            'dist/views/partials/',
            'dist/views/partials/_inc',
            'dist/views/partials/atoms',
            'dist/views/partials/_2_mocules',
            'dist/views/partials/_3_organisms'
        ]
    }));

    // Locate the views
    app.set('views', __dirname + '/dist/views');
    
    // Locate the assets
    app.use(express.static(__dirname + '/dist/assets/'));

} else {
    app.engine('handlebars', exphbs({
        // Default Layout and locate layouts and partials
        defaultLayout: 'main',
        layoutsDir: 'views/layouts/',
        partialsDir: [
            'views/partials/',
            'views/partials/_inc',
            'views/partials/atoms',
            'views/partials/_2_mocules',
            'views/partials/_3_organisms'
        ]
    }));

    // Locate the views
    app.set('views', __dirname + '/views');
    
    // Locate the assets
    app.use('/assets', express.static(__dirname + '/assets'));
}

// Set Handlebars
app.set('view engine', 'handlebars');


app.set('title', 'Fuckers');
app.get('title'); // "My Site"
/*
 * Routes
 */
// Index Page
app.get('/', function (req, res) {
    // response.send('Shaking');
    res.render('index.html');
    console.log('bootie');
});


app.get('/test', function (req, res) {
    res.send('Shaking');
    // res.render('index');
    console.log('bootie');
});


/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);
// console.log(process.env.NODE_ENV);

// var http = require('http')
// var port = process.env.PORT || 1337;
// http.createServer(function(req, res) {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello World\n');
// }).listen(port);



// app.listen(port, function(){
//   console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
// });