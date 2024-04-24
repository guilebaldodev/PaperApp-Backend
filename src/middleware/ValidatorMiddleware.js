export const validateSchema=(schema)=>(req,res,next)=>{
    try {
        schema.parse(req.body,"body")
        console.log(req.body,"Body")
        next()
    } catch (error) {
        console.log(error.errors)
        return res.status(400).json({error:error.errors.map(err=>err.message)})
    }
}