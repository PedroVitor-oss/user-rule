import express from 'express'
import { autenticar } from '../middleware/autenticar';
import { Usuarios } from '../Usuarios';
const router = express.Router();


router.get('/deashboard',(req: express.Request, res: express.Response)=>{
    res.render("deashboard",{
        title: "private route - deashboard"
    })
})
router.get("/deashboard/me",autenticar, (req,res)=>{
    console.log("acess /me")
    // console.log("req.headers",req.headers);

    const id_user = req.user.id;

    const user = Usuarios.find(u=> u.id == id_user);

      res.render("deashboard",{
        title: "private route - deashboard about me ",
        
    })
})

router.post("/api/deashboard/me",autenticar, (req,res)=>{
    console.log("acess /me")
    // console.log("req.headers",req.headers);

    const id_user = req.user.id;

    const user = Usuarios.find(u=> u.id == id_user);

    res.json({
        status:"success",
        user:user,
        
    })
})

module.exports = router;