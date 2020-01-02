const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.set('useCreateIndex', true);