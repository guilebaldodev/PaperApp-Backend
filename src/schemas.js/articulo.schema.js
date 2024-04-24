import {z} from 'zod'



export const articuloSchema=z.object({
    titulo:z.string({
        required_error:"El titulo es requerido"
    }),
    palabras_clave:z.string({
        required_error:"Las palabras clave son requeridas"
    }),
    abstract:z.string({
        required_error:"El abstract es requerido"
    })

})