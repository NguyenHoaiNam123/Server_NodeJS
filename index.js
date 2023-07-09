const express = require('express');
const app = express();

const database = require('./database');
const User = require('./account.js');
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
database.connect();
app.post('/api/user/register', async(req, res, next)=>{
    const {fullname, phone, email, password } = req.body;
    try {
        await User.findOne({phone: phone}).then(async user => {
            if (!user){
                let data = {
                    fullname: fullname,
                    phone: phone,
                    email:email,
                    password: password,
                }
                await User(data).save()
                return res.status(200).json({success: true, record: fullname})
            }else{
                return res.status(300).json({success: false, msg: 'Account existed !'})
            }
        })
        
    } catch (error) {
        return res.status(500).json({success: false, msg: 'Server error!'})
        
    }
})

app.listen(port, ()=>{
    console.log(`Server: ${port}`);
})