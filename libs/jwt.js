import jwt from 'jsonwebtoken'

export function createToken(payload){
    console.log(process.env.SECRET_TOKEN)
        return new Promise((resolve,reject)=>{
            jwt.sign(
                payload,
                process.env.SECRET_TOKEN,
                {
                    expiresIn:"1d"
                },
                (err,token)=>{
                    if(err) reject(err)
                    resolve(token)
                }
            )})


}