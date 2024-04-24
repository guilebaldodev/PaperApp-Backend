import {z} from 'zod'

export const registerSchema=z.object({
    nombre:z.string({
        required_error:"El nombre es requerido"
    }),
    apellidos:z.string({
        required_error:"Los apellidos son requeridos"
    }),
    email:z.string({
        required_error:"El email es requerido"
    }).email({
        message:"El email es invalido"
    }),
    contraseña:z.string({required_error:"La contraseña es requerida"})
    .min(6,{message:"La contraseña debe contener almenos 6 caractere"}),
    RoleId:z.string({
        required_error:"El rol debe ser especificado"
    }),
    institucion:z.string({
        required_error:"La institucion es requerida"
    }),    
    RoleId:z.nativeEnum(["1","2","3","4"],{
        required_error:"El rol es requerido",
        invalid_type_value:"El rol no es valido"
    })

})

export const loginSchema=z.object({
    email:z.string({
            required_error:"El email es requerido"
    }).email({message:"Email invalido"}),

    contraseña:z.string({required_error:"La contraseña es requerida"})

})
