const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/kanglerian',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});