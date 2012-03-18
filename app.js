
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , httpAgent = require('http-agent'),
  , jsdom = require(jsdom).jsdom
  , host = 'denver2012.drupal.org',
  , urls = ['bofs', 'bofs/2012-03-21', 'bofs/2012-03-22'];

var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

// Scraping
function bofScrape() {
  var agent = httpAgent.create(host, urls);
  console.log('Scraping', url.length, 'pages from', agent.host);

  agent.addListener('next', function (err, agent) {
    var window = jsdom(agent.body).createWindow()
      , $ = require('jquery').create(window);

    // Now we can use jQuery to grab some DOM elements.


    agent.next();
  });

  agent.AddListener('stop', function(err, agent) {
    if (err) console.log(err);
    console.log('Done scraping.');
  });

  // Start scraping.
  agent.start();
}