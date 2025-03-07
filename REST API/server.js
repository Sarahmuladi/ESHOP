import express from 'express';
import usersRoutes from './src/users/routes.js';
import productsRoutes from './src/products/routes.js';
import registerRoutes from './src/register/routes.js';
import loginRoutes from './src/login/routes.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();



const app = express();
const port = process.env.PORT || 5000

app.use(express.json());
app.use(cors());



app.get("/", (req, res) =>{
    console.log(`${process.env.PORT}`);
    res.send("Hello World")
});


app.use('/api', usersRoutes);
app.use('/api', productsRoutes);
app.use('/api', registerRoutes);
app.use('/api', loginRoutes);



app.listen(port, () => {console.log(`app listening on port ${port}`)});