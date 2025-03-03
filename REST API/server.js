import express from 'express';
import usersRoutes from './src/users/routes.js';
import productsRoutes from './src/products/routes.js';

const app = express();
const port = 6000;

app.use(express.json());

app.get("/", (req, res) =>{
    res.send("Hello World")
});


app.use('/api', usersRoutes);
app.use('/api', productsRoutes);

app.listen(port, () => {console.log(`app listening on port ${port}`)});