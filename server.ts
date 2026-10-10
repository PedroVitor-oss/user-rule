import express from 'express';
import ejs from 'ejs';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import jwt from "jsonwebtoken"

import { Usuarios } from './Usuarios.ts';
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
    console.log("req.body",req.body);
    const {username, password} = req.body;
    const user = Usuarios.find(u => u.name === username && u.senhaHash === password);
    if(user){
        const token  = jwt.sign({
            id: user.id,
            perfil: user.perfil
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        })
        res.json({
            status:"success",
            token:token, // token jwt
        });
        console.log("login tudo certo");
        return;
    }

    // console.log("req.body", req.body);
    let FormularioPageDataAlert = FormularioPageData;
    FormularioPageDataAlert.alert = {
        type: 'danger',
        message: 'Invalid username or password'
    }

    res.json({
            status:"erro",
            
        });
});




app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on http://localhost:' + (process.env.PORT || 3000));
});
