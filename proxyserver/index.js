// https://www.youtube.com/watch?v=ZGymN8aFsv4 Trav
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config(); //in this example i don't use .env (just code)

const PORT = process.env.PORT || 5000;

const app = express();

//Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 100, //10 mins
  max: 20 //how many requuest in set time (if exceed then user will have Too many request)
})
//22 mins (explain) 
//(in Header will heve a X-RateLimit-Limit: limiter.max
// X-RateLimit-Remaining: how many left)
app.use(limiter);
app.set('trust proxy', 1)

//Set static folder
app.use(express.static('public'));

//Routes
app.use('/api', require('./routes'));

// Enable cors
app.use(cors());

app.listen(PORT, () => console.log(`Server running on ${PORT}`));