import express from 'express';
import usersRoutes from './src/users/routes.js';
import productsRoutes from './src/products/routes.js';
import registerRoutes from './src/register/routes.js';
import loginRoutes from './src/login/routes.js';
import cors from 'cors';



const app = express();
const port = 6010;

app.use(express.json());
app.use(cors());

const secret_key = "my_key";

app.get("/", (req, res) =>{
    res.send("Hello World")
});


app.use('/api', usersRoutes);
app.use('/api', productsRoutes);
app.use('/api', registerRoutes);
app.use('/api', loginRoutes);



app.listen(port, () => {console.log(`app listening on port ${port}`)});