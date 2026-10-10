import express from 'express';
import ejs from 'ejs';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import { Usuarios } from './Usuarios.ts';
dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
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


// loginn routes
const FormularioPageData = {
    title: 'public route - login page', 
    form:{
        action: '/login',
        method: 'POST',
        title:"Login Form",
        fields: [
            { label:"User name",name: 'username', type: 'text', placeholder: 'Enter your username' },
            { label:"Password",name: 'password', type: 'password', placeholder: 'Enter your password' }
        ],
        submitText: 'Login'
    }
}

app.get("/login",(req,res)=>{
    res.render('layout', FormularioPageData);
});

app.post("/login",(req: express.Request, res: express.Response)=>{
    // Handle login logic here
    const {username, password} = req.body;

    const user = Usuarios.find(u => u.name === username && u.senhaHash === password);
    if(user){
        res.send('Login form submitted');
    }

    // console.log("req.body", req.body);
    let FormularioPageDataAlert = FormularioPageData;
    FormularioPageDataAlert.alert = {
        type: 'danger',
        message: 'Invalid username or password'
    }

    res.render('layout', FormularioPageDataAlert);
});




app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on http://localhost:' + (process.env.PORT || 3000));
});
