const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const port = 5544;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/UserInfo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Create a Schema for the Data
const ItemSchema = new mongoose.Schema({
    UserName: String,
    Email: String,
    Phone_no: Number,
    Subject: String,
    Message: String

});

// Create a Model
const Item = mongoose.model('Item', ItemSchema);

// Route to handle GET request
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.htm'));
});

// Route to handle POST request
app.post('/items',async(req, res) => {
    const newItem = new Item({
        UserName: req.body.UserName,
        Email: req.body.Email,
        Phone_no: req.body.Phone_no,
        Subject: req.body.Subject,
        Message: req.body.Message

    });
    console.log(newItem);
    newItem.save()
        .catch(err => console.log(err));

    res.sendFile(path.join(__dirname + '/index.htm'));
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});