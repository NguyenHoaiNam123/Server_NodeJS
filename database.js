const mongoose = require('mongoose');
const uri_compass = "mongodb://localhost:27017/englishapp"
async function connect() {
    try {
        await mongoose.set('strictQuery', true);
        await mongoose.connect(uri_compass, {
            useNewUrlParser: true
        })
        console.log('connect db success')
    } catch (error) {
        console.log(error)
    }
};
module.exports = { connect };