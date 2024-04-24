import jwt from "jsonwebtoken";
export const authRequired=(req,res,next)=>{

    const {token}=req.cookies;
    console.log("Validades")
    if(!token) return res.status(404).json(['No token, unathorized'])

    jwt.verify(token,process.env.SECRET_TOKEN,(err,user)=>{
        
        if(err) return res.status(404).json(['Access denied'])
        req.user=user
        next()
    })
    

}