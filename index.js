"use strict";

let express = require('express');
let fileReceiver = require('./lib/fileReceiver.js');

let resolve = require('path').resolve;
let dest = resolve(process.cwd(), './');

let app = express();

app.use('/uploader', fileReceiver());

app.get('/bundle.js', function(req, res){
  res.sendFile(resolve(process.cwd(),'bundle.js'));
});

app.get('/', function(req, res){
  res.send(`
    <head>
      <script src="https://fb.me/react-15.2.1.min.js"></script>
      <script src="https://fb.me/react-dom-15.2.1.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
    </head>
    <body>
      <div id="app"></div>
      <script src="bundle.js"></script>
      <script type="text/babel">
        ReactDOM.render(
          <Dropage uploadUrl="http://localhost:3002/uploader" />,
          document.getElementById('app')
        );
      </script>
      <!-- mmm que merda hago con esto?
      -->
    </body>
  `);
});

// using arrow syntax
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send();
    // res.render('error', {
    //   message: err.message,
    //   error: err
    // });
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send();
  // res.render('error', {
  //   message: err.message,
  //   error: {}
  // });
});

app.listen(3002, (err) => {
  if(err) {
    console.log(err);
    process.exit();
  }
  console.log('Listening on 3002, saving at '+dest);
});
//module.exports = app;
