import {z} from 'zod'

export const  autorSchema = z.object({
    nombre: z.string({
        required_error: "El nombre del autor es requerido"
    })
});