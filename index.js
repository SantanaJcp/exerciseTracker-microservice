require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan')
const connectDB = require('./db/connect')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(cors());
app.use(morgan('tiny'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()
