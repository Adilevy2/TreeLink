const express=require('express');
const signUp=require('./Routes/SignUp');
const login=require('./Routes/Login');
const links=require('./Routes/Links');
const clicksLastYear=require('./Routes/ClicksLastYear');
const updatePageColor=require('./Routes/UpdatePageColor');
const clicksLastWeek=require('./Routes//ClicksLastWeek');
const getUserLinks=require('./Routes/GetUserLinks');
const updateImage=require('./Routes/UpdateImage');
const clicks=require('./Routes/Clicks');


const mongoose=require('mongoose');
const app = express();
mongoose.set('strictQuery', false);
const cors=require('cors');



mongoose.connect('mongodb+srv://adilevy156:rItxYgrzJIAw89WV@cluster0.s8vuyuz.mongodb.net/test')
.then(()=>console.log('connected to data base'))
.catch(()=>console.log('couldnt connect to data base '));


app.use(express.json({limit: '50mb'}));
app.use(cors());



app.use('/api/signUp',signUp)
app.use('/api/login',login)
app.use('/api/links',links)
app.use('/api/getUserLinks',getUserLinks)
app.use('/api/updatePageColor',updatePageColor)
app.use('/api/updateImage',updateImage)
app.use('/api/clicksLastYear',clicksLastYear)
app.use('/api/clicksLastWeek',clicksLastWeek)
app.use('/api/clicks',clicks)

  const port = process.env.PORT || 4905; 

app.listen(port, () => console.log(`active on ${port}`))