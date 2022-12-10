const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/form',{
    
    
}).then(()=>{
    console.log(`connection sucessful`)
}).catch((e)=>{
    console.log(`connection error`)
})
