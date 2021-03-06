
// /*
//  * Config for Production and Development
//  */
// // if (process.env.NODE_ENV === 'production') {
// //     // Set the default layout and locate layouts and partials
// //     app.engine('handlebars', exphbs({
// //         defaultLayout: 'main',
// //         layoutsDir: 'dist/views/layouts/',
// //         partialsDir: [
// //             'dist/views/partials/',
// //             'dist/views/partials/atoms',
// //             'dist/views/partials/_2_mocules',
// //             'dist/views/partials/_3_organisms'
// //         ]
// //     }));



// // } else {
//     // app.engine('handlebars', exphbs({
//     //     // Default Layout and locate layouts and partials
//     //     defaultLayout: '',
//     //     layoutsDir: theLayoutsPath,
//     //     partialsDir: [
//     //         thePartialsPath,
//     //         theAtomsPath,
//     //         theMoleculesPath,
//     //         theOrganismsPath
//     //     ],
//     // }));



'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var port = 1337;

// Set Handlebars
var hbs  = require('express-hbs');


// require('express-debug')(app, {/* settings */});

/*
 * Use Handlebars for templating
 */
 
app.engine('handlebars', hbs.express3({
    extname: '.handlebars',
    // defaultLayout: '',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir:  [ __dirname + '/views/partials',
                    __dirname + '/views/partials/atoms',
                    __dirname + '/views/partials/organisms'
    ],
}));
// Register `hbs.engine` with the Express app.
app.set('view engine', 'handlebars');

// Locate the views
app.set('views', __dirname + '/views');
// Locate the assets
app.use('/assets/', express.static(__dirname + '/assets'));



/*
 * Routes
 */

// Index Page
app.get('/', function (req, res) {
    
    //console.error(err.stack);
    // res.status(500).send('Something broke!');
    //res.send('Shaking');
    //console.log('boom');
    res.render('index', {
        title: 'Design Patterns',
        layout: 'main'
    });
});

// Template library
app.get('/template-library', function (req, res) {
    
    //console.error(err.stack);
    // res.status(500).send('Something broke!');
    //res.send('Shaking');
    //console.log('boom');
    res.render('template-lib', {
        title: 'Template library',
        layout: 'main'
    });
});


app.get('/section-page', function (req, res) {
    
    //console.error(err.stack);
    // res.status(500).send('Something broke!');
    //res.send('Shaking');
    //console.log('boom');
    res.render('section-page', {
        title: 'Section Page',
        layout: 'main'
    });
});


app.get('/pattern-library', function (req, res) {
    
    //console.error(err.stack);
    // res.status(500).send('Something broke!');
    //res.send('Shaking');
    //console.log('boom');
    res.render('pattern_library', {
        title: 'Pattern library',
        layout: 'main'
    });
});

app.get('/user-needs', function (req, res) {
    
    //console.error(err.stack);
    // res.status(500).send('Something broke!');
    //res.send('Shaking');
    //console.log('boom');
    res.render('user-needs', {
        title: 'User needs',
        layout: 'main'
    });
});


app.get('/how-users-read', function (req, res) {
    
    //console.error(err.stack);
    // res.status(500).send('Something broke!');
    //res.send('Shaking');
    //console.log('boom');
    res.render('how-users-read', {
        title: 'How users read',
        layout: 'main'
    });
});



app.get('/elements', function (req, res) {
    
    //console.error(err.stack);
    // res.status(500).send('Something broke!');
    //res.send('Shaking');
    //console.log('boom');
    res.render('elements', {
        title: 'Elements library',
        layout: 'main'
    });
});


app.get('/content-writing', function (req, res) {
    
    //console.error(err.stack);
    // res.status(500).send('Something broke!');
    //res.send('Shaking');
    //console.log('boom');
    res.render('content-writing', {
        title: 'Content writing guide',
        layout: 'main'
    });
});

app.get('/web-writing', function (req, res) {
    
    //console.error(err.stack);
    // res.status(500).send('Something broke!');
    //res.send('Shaking');
    //console.log('boom');
    res.render('web-writing', {
        title: 'Writing for the web',
        layout: 'main'
    });
});

app.get('/wayfinding', function (req, res) {
    
    //console.error(err.stack);
    // res.status(500).send('Something broke!');
    //res.send('Shaking');
    //console.log('boom');
    res.render('wayfinding', {
        title: 'Common wayfinding elements',
        layout: 'main'
    });
});


app.get('/digital-brand', function (req, res) {
    
    //console.error(err.stack);
    // res.status(500).send('Something broke!');
    //res.send('Shaking');
    //console.log('boom');
    res.render('digital_brand', {
        title: 'Digital Brand Guidelines',
        layout: 'main'
    });
});

// Test page
app.get('/test', function (req, res) {
    
    //console.error(err.stack);
    // res.status(500).send('Something broke!');
    //res.send('Testies');
    //console.log('bos');
    res.render('test', {
        title: 'Design Patterns',
        layout: 'main'
    });
});


/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);


