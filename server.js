const express= require('express')
const bodyparser=require('body-parser')
const authRoutes=require('./routes/authRoutes')
const mongoose = require('mongoose')
const cors = require('cors')
const DOTENV = require('dotenv')
const path = require('path')


const app= express()  //always use app in top for avoid .env issue

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
    origin: 'http://localhost:3000', // Allow only this origin
    // methods: 'GET,POST,PUT,DELETE', 
    credentials: true // Allow cookies or credentials if needed
}));
DOTENV.config()
const MONGO_URI = process.env.MONGO_URI
const PORT=process.env.PORT || 6000


app.get('/',(req,res)=>{
    const data='hello world'
    res.json({message:'data',data})
})
app.get('/home',(req,res)=>{
   res.sendFile(path.join(__dirname, 'public', 'home.html'))
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

