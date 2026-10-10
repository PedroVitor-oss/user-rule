import jwt from 'jsonwebtoken';
import express from 'express';
import env from 'dotenv';

env.config()

function autenticar(req:express.Request ,res : express.Response,next){
    const header:string = req.headers.authorization;
    if(!header){
        console.log("autenticar: ","token não informado");
        return res.status(401).json({
            erro:"TOken não informado"
        })
    }

    // separa token
    const partes = header.split(' ');
    const tipo = partes[0];
    const token = partes[1];
    
    if(tipo !== "Baarer"){
        console.log("autenticar: ","formato token errado");
        return res.status(401).json({
            erro:"Token fomato errado"
        })
    }

    try{
        const user = jwt.verify(token,process.env.JWT_SECRET);
        req.user = user;
        next();
    }catch{
        console.log("autenticar: ","token invalido");
        return res.status(401).json({
            erro:"Token invalido"
        })
    }

}

export {autenticar};