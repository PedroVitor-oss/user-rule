import express from 'express';
import ejs from 'ejs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

//public router
app.get("/",(req,res)=>{
    res.render('layout', { 
        title: 'public route - home page', 
        centerButton:{
            name: 'login',
            route: '/login'
        } });
})

// loginn routes
app.get("/login",(req,res)=>{
    res.render('layout', {
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
    });
});

app.post("/login",(req,res)=>{
    // Handle login logic here
    res.send('Login form submitted');
});




app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on http://localhost:' + (process.env.PORT || 3000));
});
