import {z} from 'zod'

export const congresoSchema=z.object({
    nombre:z.string({
        required_error:"El nombre es requerido"
    }),

    fecha :z.string({
        required_error:"La fecha es requerida",
    }),
    descripcion:z.string({
        required_error:"La descripcion es requerida"
    }),
    institucion:z.string({
        required_error:"La institucion es requerida"
    }),
    web_institucion:z.string().optional(),
    link_convocatoria:z.string().optional()


})