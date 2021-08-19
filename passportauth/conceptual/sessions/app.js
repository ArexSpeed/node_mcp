const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const MongoStore = require('connect-mongo')(session);

const app = express();

const dbString = 'mongodb://localhost:27017/tutorial_db';
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
const connection = mongoose.createConnection(dbString, dbOptions);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: 'sessions'
})

app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.get('/', (req, res, next) => {
  console.log(req.session); // check how many user visit this site
  if (req.session.viewCount) {
    req.session.viewCount = req.session.viewCount + 1;
  } else {
    req.session.viewCount = 1
  }
  res.send(`<h1>You have visited thispage ${req.session.viewCount} times</h1>`);
})

app.listen(5000);