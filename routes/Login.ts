import express from 'express'
import jwt from 'jsonwebtoken'
import { Usuarios } from '../Usuarios';
const router = express.Router();


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

router.get("/login",(req,res)=>{
    res.render('layout', FormularioPageData);
});

router.post("/login",(req: express.Request, res: express.Response)=>{
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

module.exports =  router