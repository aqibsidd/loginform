const express = require('express');
const bodyParser = require('body-parser');
const {check, validationResult} = require('express-validator');
const app = express();
const port = process.env.PORT || 5000;

require('./db/conn');
const Register = require('./models/redister');
const { json } = require('body-parser');

app.set('view engine','ejs');
app.engine('ejs', require('ejs').__express);
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const urlencoderParse = bodyParser.urlencoded({extended: false})

app.get('/', (req, res) => {
  res.render('index')
});
app.get('/register', (req, res) => {
    res.render('register')
});
app.post('/register', async(req,res) =>{
    try{
        const reisteruser = new Register({
            username : req.body.username,
            email : req.body.email,
            password : req.body.password,
            password1 : req.body.password1

        })
        const registerd = await reisteruser.save();
        res.status(201).render(index);


    }catch(error){
        res.status(400).send(error)

    }

});
app.post('/register', urlencoderParse,[
    check('username','This username must be 4+ character long')
        .exists()
        .isLength({min: 4}),
    check('email','Email is not valid')
        .isEmail()
        .normalizeEmail(),
    check('password','password must 8 character')
        
        .isLength({min: 8})


], (req, res) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        //return res.status(422).jsonp(error.array())
        const alert = error.array()
        res.render('register',{
            alert
        })
    }
    res.json(req.body)
})
app.listen(port, () => console.info(`App is listenin on port:http://localhost:${port}`))
