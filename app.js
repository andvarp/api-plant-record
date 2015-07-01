'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var port = 3000;
var Parse = require('parse').Parse;

Parse.initialize("mfNNoZ4tOq4X2WJJaUiYtZCPSpqkWkWHz0SqpONh", "JIQVCL8YRsSoIEVguEnhAlGrZCgtplwnvQoATVxs");

var api = require('./api')(Parse);

/*
 * Use Handlebars for templating
 */
var exphbs = require('express3-handlebars');
var hbs;

// For gzip compression
app.use(express.compress());

app.use(express.urlencoded());

app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));

// app.use(express.basicAuth('testUser', 'testPass'));

/*
 * Config for Production and Development
 */
if (process.env.NODE_ENV === 'production') {
    // Set the default layout and locate layouts and partials
    app.engine('handlebars', exphbs({
        defaultLayout: 'main',
        layoutsDir: 'dist/views/layouts/',
        partialsDir: 'dist/views/partials/'
    }));

    // Locate the views
    app.set('views', __dirname + '/dist/views');

    // Locate the assets
    app.use(express.static(__dirname + '/dist/assets'));

} else {
    app.engine('handlebars', exphbs({
        // Default Layout and locate layouts and partials
        defaultLayout: 'main',
        layoutsDir: 'views/layouts/',
        partialsDir: 'views/partials/'
    }));

    // Locate the views
    app.set('views', __dirname + '/views');

    // Locate the assets
    app.use(express.static(__dirname + '/assets'));
}

// Set Handlebars
app.set('view engine', 'handlebars');



/*
 * Routes
 */

//Log all request
app.all(/.*/, api.all);

// Index Page
app.get('/', function(request, response, next) {
    response.render('index');
});

// API Page
app.get('/api', api.api);
app.get('/api/test', api.test);

app.get('/api/plants', api.plant.getAll);
app.post('/api/plant', api.plant.add);
app.get('/api/plant/:id', api.plant.getSingle);
app.post('/api/plant/:id', api.plant.saveSingle);
app.delete('/api/plant/:id', api.plant.deleteSingle);

app.post('/login', api.user.login);
app.get('/logout', api.user.logout);





/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);