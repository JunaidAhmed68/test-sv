import express from 'express';
import mongoose from 'mongoose';
const app = express();
app.use(express.json());
import userRoutes from '../routes/userRoute.mjs'
import 'dotenv/config'

const PORT = process.env.PORT || 3000;
app.use('/users',userRoutes);



// Connect to MongoDB
 mongoose.connect(process.env.MONGOBD_URL).then(()=>{
    console.log('mongodb connected!')
}).catch((err)=>{
    console.error('error in mongodb connection!:',err)
})


// Start the server
app.get('/',(req, res)=>{
    res.send('get api')
})






app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
