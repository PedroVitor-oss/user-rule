import express from 'express';
import ejs from 'ejs';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import jwt from "jsonwebtoken"
import {autenticar} from "./middleware/autenticar.ts"
import LoginRoute from './routes/Login.ts'
import DeashboardRoute from './routes/Deashboard.ts'

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));


//public router
app.get("/",(req: express.Request, res: express.Response)=>{
    res.render('layout', { 
        title: 'public route - home page', 
        paragraph:"Bem vindo ao site de regras de usuários. Este site é um exemplo de como implementar autenticação e autorização em uma aplicação web usando Node.js, Express e TypeScript.",
        centerButton:{
            name: 'login',
            route: '/login'
        } });
})

//routes
app.use(LoginRoute)
app.use(DeashboardRoute);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on http://localhost:' + (process.env.PORT || 3000));
});
