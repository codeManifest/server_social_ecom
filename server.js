const express= require('express')
const bodyparser=require('body-parser')
const authRoutes=require('./routes/authRoutes')
const mongoose = require('mongoose')
const cors = require('cors')


const MONGO_URI = 'mongodb+srv://nabins9678:UU5d4NCdpIQapyIs@education.naznvfp.mongodb.net/?retryWrites=true&w=majority&appName=education'
app.use(cors({
    origin: 'http://localhost:3000', // Allow only this origin
    // methods: 'GET,POST,PUT,DELETE', 
    credentials: true // Allow cookies or credentials if needed
}));
const app= express()
const PORT = 5000;

app.get('/',(req,res)=>{
    const data='hello world'
    res.json({message:'data',data})
})
mongoose.connect(MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

.then(()=> console.log('conected to mongodb'))
.catch((err)=> console.log(err + 'something wrong in mongodb connection'))



app.use(bodyparser.json)
app.use('/api/auth', authRoutes )

app.listen(PORT,()=>console.log('server is running on '+ PORT))

