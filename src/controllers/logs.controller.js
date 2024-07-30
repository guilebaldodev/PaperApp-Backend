import Logs from "../model/logs.model.js"
import Usuarios from "../model/user.model.js"

export const createLog=async(req,res)=>{
    
    try {
        const userId=req.user.id
        const {tipo,veredicto}=req.body
    
        const types= ['revision','asignacion','edicion','evaluacion']
    
        const user=Usuarios.findByPk(userId)
        if(!user) return res.status(404).json({
            error:"Usuario no encontrado"
        })
    
        if(!types.includes(tipo)) return res.status(403).json({error:"Introduce un tipo valido"})
        
        if((tipo=='revision'||tipo=='evaluacion'||tipo=='admin') && (!['aprobado','desaprobado'].includes(veredicto))) return res.status(403).json({error:"El tipo introducido necesita un veredicto"})
        
        const log=await Logs.create({
            UsuarioId:userId,
            ArticuloId:req.body.articulo,
            tipo,
            veredicto
        })

        return res.status(201).json(log)

    } catch (error) {
        console.log(error)
    }






}