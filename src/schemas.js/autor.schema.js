import {z} from 'zod'

export const  autorSchema = z.object({
    nombre: z.string({
        required_error: "El nombre del autor es requerido"
    }),
    apellidos: z.string({
        required_error: "Los apellidos del autor son requeridos"
    }),
    contacto: z.string({
        required_error: "El contacto del autor es requerido"
    }).optional()
});